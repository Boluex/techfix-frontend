import { useState, useEffect } from 'react';
import { TrendingUp, Zap, AlertCircle, Download, Users, Clock } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://techfixai-backend.onrender.com/analytics?key=6G4xjZrP7IebKXnVvNQwphH0VvQdXqv9nTjKFXLae+M=&days=${days}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch analytics');
      
      const data = await response.json();
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg">
          <AlertCircle className="w-8 h-8 mb-2" />
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <h3 className="text-white/80 font-medium mb-1">{title}</h3>
      {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-white/60">Track your AI Tech Repair performance</p>
          </div>
          
          <div className="flex gap-2">
            {[7, 14, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  days === d
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Tokens Generated"
            value={analytics?.tokens_generated || 0}
            subtitle="New sessions created"
            color="text-blue-400"
          />
          
          <StatCard
            icon={Zap}
            title="AI Requests"
            value={analytics?.ai_requests || 0}
            subtitle="Total repair plans generated"
            color="text-yellow-400"
          />
          
          <StatCard
            icon={Download}
            title="Agent Downloads"
            value={analytics?.agent_downloads || 0}
            subtitle="Desktop app installations"
            color="text-green-400"
          />
          
          <StatCard
            icon={AlertCircle}
            title="AI Errors"
            value={analytics?.ai_errors || 0}
            subtitle={`${analytics?.error_rate || 0}% error rate`}
            color="text-red-400"
          />
          
          <StatCard
            icon={Users}
            title="Human Help Requests"
            value={analytics?.human_help_requests || 0}
            subtitle="Escalations to technician"
            color="text-purple-400"
          />
          
          <StatCard
            icon={Clock}
            title="Total Events"
            value={analytics?.total_events || 0}
            subtitle={`Last ${days} days`}
            color="text-cyan-400"
          />
        </div>

        {/* Recent Errors */}
        {analytics?.recent_errors && analytics.recent_errors.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
              Recent Errors
            </h2>
            
            <div className="space-y-3">
              {analytics.recent_errors.map((err, idx) => (
                <div
                  key={idx}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-red-400 font-mono text-sm">
                      {new Date(err.timestamp).toLocaleString()}
                    </span>
                    <span className="text-white/60 text-sm">{err.issue}</span>
                  </div>
                  <p className="text-white/80">{err.error}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Rate Chart */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Success Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Success Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">AI Success Rate</span>
                <span className="text-2xl font-bold text-green-400">
                  {analytics?.ai_requests > 0
                    ? Math.round(((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100)
                    : 0}%
                </span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                  style={{
                    width: `${analytics?.ai_requests > 0
                      ? ((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100
                      : 0}%`
                  }}
                />
              </div>
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Token → AI Request Rate</span>
                <span className="text-2xl font-bold text-blue-400">
                  {analytics?.tokens_generated > 0
                    ? Math.round((analytics.ai_requests / analytics.tokens_generated) * 100)
                    : 0}%
                </span>
              </div>
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{
                    width: `${analytics?.tokens_generated > 0
                      ? (analytics.ai_requests / analytics.tokens_generated) * 100
                      : 0}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchAnalytics}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
