import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const GithubAnalytics = () => {
  const [data, setData] = useState({
    publicRepos: 18,
    followers: 12,
    following: 15,
    totalStars: 4,
    languages: [
      { name: "JavaScript", count: 8 },
      { name: "TypeScript", count: 6 },
      { name: "HTML", count: 3 },
      { name: "CSS", count: 1 },
    ],
    topRepos: [
      { name: "bull-boom", stars: 2, url: "https://github.com/bhargavibattula/bull-boom" },
      { name: "chatbot-web", stars: 1, url: "https://github.com/bhargavibattula/chatbot-web" },
      { name: "portfolio", stars: 1, url: "https://github.com/bhargavibattula/portfolio" },
    ],
    loading: true,
  });

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        // Fetch User Info
        const userResponse = await fetch("https://api.github.com/users/bhargavibattula");
        if (!userResponse.ok) throw new Error("Failed to fetch user");
        const userData = await userResponse.json();

        // Fetch Repos
        const reposResponse = await fetch("https://api.github.com/users/bhargavibattula/repos?per_page=100");
        if (!reposResponse.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposResponse.json();

        // Calculate Total Stars
        const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

        // Calculate Language Usage
        const langCounts = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });
        const languages = Object.entries(langCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);

        // Sort and select top repositories
        const topRepos = reposData
          .map((repo) => ({
            name: repo.name,
            stars: repo.stargazers_count || 0,
            url: repo.html_url,
            pushedAt: new Date(repo.pushed_at).getTime(),
          }))
          // Sort by stars descending, then by recent activity
          .sort((a, b) => {
            if (b.stars !== a.stars) return b.stars - a.stars;
            return b.pushedAt - a.pushedAt;
          })
          .slice(0, 3);

        setData({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          languages,
          topRepos,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        // Keep default fallback values but stop loading state
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchGithubData();
  }, []);

  return (
    <section id="github-stats" className="py-24 px-6 md:px-8 bg-bg-primary relative overflow-hidden">
      {/* Subtle border top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-border/20 to-transparent" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-mint/20 bg-mint/5 backdrop-blur-3xl">
            <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-mint">
              // 07 - Live Stats
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-text-primary">
            GitHub Analytics
          </h2>
          <p className="text-sm text-text-muted max-w-xl">
            Dynamic repository metrics and transmission diagnostics fetched live from GitHub.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Repos */}
          <div className="relative group p-6 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-border-strong rounded-[24px] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-mint/10 border border-mint/20 flex items-center justify-center text-mint">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M4 6H2v14a2 2 0 002 2h14v-2H4V6zm16-4H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm0 14H8V4h12v12z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-black text-text-primary leading-none tracking-tighter">
                  {data.loading ? "..." : data.publicRepos}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mt-1">
                  Public Repos
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Followers */}
          <div className="relative group p-6 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-border-strong rounded-[24px] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-fuchsia/10 border border-fuchsia/20 flex items-center justify-center text-fuchsia">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-black text-text-primary leading-none tracking-tighter">
                  {data.loading ? "..." : data.followers}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mt-1">
                  Followers
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Following */}
          <div className="relative group p-6 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-border-strong rounded-[24px] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-royal/10 border border-royal/20 flex items-center justify-center text-royal">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-black text-text-primary leading-none tracking-tighter">
                  {data.loading ? "..." : data.following}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mt-1">
                  Following
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Stars */}
          <div className="relative group p-6 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-border-strong rounded-[24px] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-black text-text-primary leading-none tracking-tighter">
                  {data.loading ? "..." : data.totalStars}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted mt-1">
                  Total Stars
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Columns Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Column 1: Most Used Languages */}
          <div className="p-8 bg-white/[0.01] backdrop-blur-md border border-border-strong rounded-[32px]">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-mint mb-6">
              Most Used Languages
            </h3>
            <div className="space-y-6">
              {data.languages.map((lang) => {
                // Calculate percentage based on total counts
                const totalCount = data.languages.reduce((acc, l) => acc + l.count, 0) || 1;
                const percentage = Math.round((lang.count / totalCount) * 100);

                return (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-text-primary">{lang.name}</span>
                      <span className="text-text-muted">{lang.count} {lang.count === 1 ? 'repo' : 'repos'}</span>
                    </div>
                    <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-mint to-royal rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Top Repositories */}
          <div className="p-8 bg-white/[0.01] backdrop-blur-md border border-border-strong rounded-[32px] flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-fuchsia mb-6">
                Top Repositories
              </h3>
              <div className="space-y-4">
                {data.topRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between p-4 bg-white/[0.01] border border-border rounded-2xl hover:bg-white/[0.03] hover:border-border-strong transition-all duration-300"
                  >
                    <span className="font-semibold text-sm text-text-primary font-mono">{repo.name}</span>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>{repo.stars}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://github.com/bhargavibattula"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-mint hover:text-royal transition-colors duration-300"
              >
                <span>View full profile</span>
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubAnalytics;
