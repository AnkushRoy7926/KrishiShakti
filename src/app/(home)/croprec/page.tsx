'use client';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SoilFormValues {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  latitude: number;
  longitude: number;
}

interface WeatherResponse {
  temp: number;
  humidity: number;
  avgRainfall: number; // in cm
}

export default function CropPage() {
  const form = useForm<SoilFormValues>({
    defaultValues: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      ph: 7,
      latitude: 0,
      longitude: 0,
    },
  });

  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [crop, setCrop] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get emoji based on crop name - Updated for exact model predictions
  const getCropEmoji = (cropName: string): string => {
    const cropEmojis: { [key: string]: string } = {
      rice: '🌾',
      maize: '🌽',
      chickpea: '🫘',
      kidneybeans: '🫘',
      pigeonpeas: '🫛',
      mothbeans: '🫘',
      mungbean: '🫘',
      blackgram: '🫘',
      lentil: '🫘',
      pomegranate: '🍎',
      banana: '🍌',
      mango: '🥭',
      grapes: '🍇',
      watermelon: '🍉',
      muskmelon: '🍈',
      apple: '🍎',
      orange: '🍊',
      papaya: '🥭',
      coconut: '🥥',
      cotton: '🌿',
      jute: '🌿',
      coffee: '☕',
      default: '🌾', // wheat emoji as fallback
    };

    const lowerCropName = cropName.toLowerCase();
    return cropEmojis[lowerCropName] || cropEmojis.default;
  };

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        form.setValue('latitude', pos.coords.latitude);
        form.setValue('longitude', pos.coords.longitude);
        console.log(
          'Detected location:',
          pos.coords.latitude,
          pos.coords.longitude
        );
      },
      () => {
        // alert('Unable to retrieve your location');
      }
    );
  }, [form]);

  const onSubmit = async (values: SoilFormValues) => {
    console.log('Form Values:', values);
    setError(null);
    setWeatherData(null);
    setCrop(null);
    setLoading(true);

    try {
      // Fetch weather data
      const weatherRes = await fetch(
        `/api/weather?lat=${values.latitude}&lon=${values.longitude}`
      );
      if (!weatherRes.ok) {
        const err = await weatherRes.json();
        throw new Error(err.error || 'Weather API request failed');
      }
      const weather: WeatherResponse = await weatherRes.json();
      console.log('Weather Response:', weather);
      setWeatherData(weather);

      // Prepare model input - Fixed URL construction
      const rainfallMm = weather.avgRainfall * 10;

      // Method 1: Using URLSearchParams (recommended)
      const params = new URLSearchParams({
        N: values.nitrogen.toString(),
        P: values.phosphorus.toString(),
        K: values.potassium.toString(),
        temperature: weather.temp.toString(),
        humidity: weather.humidity.toString(),
        ph: values.ph.toString(),
        rainfall: rainfallMm.toFixed(2),
      });

      const predictUrl = `http://localhost:8000/predict?${params.toString()}`;
      console.log('Predict URL:', predictUrl);

      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      // First, let's test if the server is reachable
      console.log('Testing API connection...');

      const modelRes = await fetch(predictUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        mode: 'cors', // Explicitly set CORS mode
      });

      clearTimeout(timeoutId);

      if (!modelRes.ok) {
        let errorMessage = `HTTP ${modelRes.status}: ${modelRes.statusText}`;
        try {
          const errorData = await modelRes.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use the status text
        }
        throw new Error(errorMessage);
      }

      const modelData = await modelRes.json();
      console.log('Model Response:', modelData);
      setCrop(modelData.prediction);
    } catch (err: any) {
      console.error('Error:', err);

      if (err.name === 'AbortError') {
        setError(
          'Request timed out. Please check if your API server is running.'
        );
      } else if (err.message.includes('fetch')) {
        setError(
          'Failed to connect to the API. Make sure your server is running on port 8000.'
        );
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pt-0 pb-12">
      <div
        className="relative flex h-64 w-full items-center justify-center bg-cover bg-center md:h-80"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1674019234994-eceabbdd091d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="bg-opacity-50 absolute inset-0 px-3" />
        <h1 className="relative z-10 text-center text-4xl font-extrabold tracking-wide text-white md:text-6xl">
          Crop Recommendation
        </h1>
      </div>

      {/* Content Section */}
      <div className="mx-auto mb-7 flex max-w-7xl flex-col items-center justify-center gap-[5rem] px-6 py-16 md:flex-row">
        {/* Text Section */}
        <div className="space-y-6 pl-7 md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Soil Analysis
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Understanding your soil is like getting a health check-up for your
            land. Soil analysis tells you what nutrients are present in your
            soil and whether it's too acidic, too alkaline, or just right for
            growing crops. Just like you wouldn't take medicine without knowing
            what your body needs, you shouldn't grow crops without knowing what
            your soil can support. That's where our model comes in — We've built
            a smart system using a technique called Random Forest, which looks
            at the values from your soil test (like nitrogen, phosphorus, pH,
            etc.) and recommends the best crops to grow. This way, you get
            better yields, save money on fertilizers, and make the most of your
            land.
          </p>
        </div>

        {/* Video Section */}
        <div className="w-full md:w-1/2">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/T_0N__RsNBg?si=7hV-2kuDHEl6v-Lu"
            title="YouTube video player"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full rounded-xl shadow-md"
          ></iframe>
        </div>
      </div>

      {/* Form Section */}
      <div className="mx-auto mt-16 max-w-6xl px-6 pb-20">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Get Your Crop Recommendation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Enter your soil parameters and location details below. Our
            AI-powered system will analyze your data and recommend the most
            suitable crops for your land.
          </p>
        </div>

        {/* Form Container */}
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 shadow-xl md:p-12">
          <h3 className="mb-8 text-2xl font-semibold text-gray-800 md:text-3xl">
            Soil Data & Location Information
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Soil Parameters Grid */}
              <div>
                <h4 className="mb-6 text-xl font-medium text-gray-700">
                  Soil Parameters
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    { name: 'nitrogen', label: 'Nitrogen (N)', unit: 'kg/ha' },
                    {
                      name: 'phosphorus',
                      label: 'Phosphorus (P)',
                      unit: 'kg/ha',
                    },
                    {
                      name: 'potassium',
                      label: 'Potassium (K)',
                      unit: 'kg/ha',
                    },
                    { name: 'ph', label: 'pH Level', unit: '0-14' },
                  ].map(({ name, label, unit }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as keyof SoilFormValues}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            {label}
                            <span className="ml-1 text-xs text-gray-500">
                              ({unit})
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="any"
                              {...field}
                              onChange={e =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                              className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              placeholder={`Enter ${label.toLowerCase()}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h4 className="mb-6 text-xl font-medium text-gray-700">
                  Location Information
                </h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Latitude
                          <span className="ml-1 text-xs text-gray-500">
                            (degrees)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., 40.7128"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Longitude
                          <span className="ml-1 text-xs text-gray-500">
                            (degrees)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            {...field}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                            className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., -74.0060"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-between sm:gap-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={detectLocation}
                  className="h-12 flex-1 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 sm:flex-none sm:px-8"
                >
                  📍 Detect My Location
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 min-w-[200px] rounded-lg bg-green-600 px-8 text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      🌱 Get Recommendation
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Results Section */}
          {error && (
            <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">❌</div>
                <div>
                  <h4 className="font-semibold text-red-800">Error Occurred</h4>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {weatherData && (
            <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="text-2xl">🌤️</div>
                <h3 className="text-xl font-semibold text-blue-800">
                  Weather Data Retrieved
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {weatherData.temp}°C
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Temperature
                  </div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {weatherData.humidity}%
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Humidity
                  </div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {weatherData.avgRainfall} cm
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Avg. Annual Rainfall
                  </div>
                </div>
              </div>
            </div>
          )}

          {crop && (
            <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-8 text-center">
              <div className="mb-4 text-6xl">{getCropEmoji(crop)}</div>
              <h3 className="mb-2 text-2xl font-bold text-green-800">
                Recommended Crop
              </h3>
              <p className="text-3xl font-extrabold text-green-600 capitalize">
                {crop}
              </p>
              <p className="mt-3 text-sm text-green-700">
                Based on your soil parameters and local weather conditions, this
                crop is most likely to thrive on your land.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
