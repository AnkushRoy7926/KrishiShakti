'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';

type NewsArticle = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [category] = useState('agriculture OR farming OR crops');
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchArticles = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    try {
      const url =
        `/api/newsdata?category=${encodeURIComponent(category)}` +
        (reset || !nextPage ? '' : `&page=${nextPage}`);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();

      setArticles(prev =>
        reset ? data.articles : [...prev, ...data.articles]
      );

      setNextPage(data.nextPage ?? null);
      setHasMore(!!data.nextPage);
    } catch (err) {
      console.error('Fetch error:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
      if (initialLoad) setInitialLoad(false);
    }
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        fetchArticles();
      }
    },
    [hasMore, loading, nextPage]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    fetchArticles(true);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="relative z-10 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1674019234994-eceabbdd091d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="bg-black/50">
          <div className="mx-auto max-w-6xl px-4 py-32 text-center">
            <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
              Farming News
            </h2>
            <p className="mt-4 pb-4 text-lg text-gray-200">
              Latest agriculture and farming news globally
            </p>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="relative z-20 mx-auto -mt-20 max-w-6xl px-4 pb-16">
        {initialLoad && loading ? (
          <div className="flex h-60 flex-col items-center justify-center">
            <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600">Loading news...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <div
                  key={`${article.url}-${index}`}
                  className="min-h-[400px] transform transform-gpu overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:rotate-x-[1deg] hover:rotate-y-[1deg] hover:shadow-2xl"
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex h-[calc(100%-12rem)] flex-col justify-between p-4">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="mb-4 text-sm text-gray-600">
                          {article.description}
                        </p>
                      )}
                    </div>
                    <div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md border border-black bg-white px-4 py-2 text-sm font-medium text-black transition duration-200 hover:bg-black hover:text-white"
                      >
                        Read more -
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {loading && !initialLoad && (
              <div className="flex items-center justify-center py-6">
                <div className="mr-2 h-6 w-6 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <span className="text-gray-600">Loading more...</span>
              </div>
            )}

            <div ref={loaderRef} className="h-10" />

            {!hasMore && articles.length > 0 && (
              <div className="mt-8 text-center text-gray-600">
                No more articles to load
              </div>
            )}

            {!loading && articles.length === 0 && !initialLoad && (
              <div className="mt-8 text-center text-gray-600">
                No farming news articles found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default News;
