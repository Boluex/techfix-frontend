import { useState, useEffect } from 'react';
import { TrendingUp, Zap, AlertCircle, Download, Users, Clock, Globe, RefreshCw, AlertTriangle } from 'lucide-react';

interface AnalyticsData {
  unique_visitors: number; 
  tokens_generated: number;
  ai_requests: number;
  agent_downloads: number;
  ai_errors: number;
  error_rate: number;
  human_help_requests: number;
  total_events: number;
  recent_errors: Array<{
    timestamp: string;
    issue: string;
    error: string;
  }>;
}

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [days, setDays] = useState(7);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const apiKey = '6G4xjZrP7IebKXnVvNQwphH0VvQdXqv9nTjKFXLae+M=';
      
      const response = await fetch(
        `https://techfixai-backend.onrender.com/analytics?key=${encodeURIComponent(apiKey)}&days=${days}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch analytics');
      }
      
      const data = await response.json();
      setAnalytics(data);
      setError(null);
      
      console.log('✅ Analytics loaded:', data);
    } catch (err: any) {
      console.error('❌ Analytics error:', err);
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading analytics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg max-w-md w-full">
          <AlertCircle className="w-8 h-8 mb-2 mx-auto" />
          <p className="text-center font-semibold mb-2">Error Loading Analytics</p>
          <p className="text-sm text-center mb-4">{error}</p>
          <button
            onClick={() => fetchAnalytics()}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const hasData = analytics && analytics.total_events > 0;

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all hover:scale-105 duration-300">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${color}`} />
        <span className="text-3xl font-bold text-white">{value.toLocaleString()}</span>
      </div>
      <h3 className="text-white/80 font-medium mb-1">{title}</h3>
      {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-white/60">Track your AI Tech Repair performance</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {[7, 14, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                disabled={loading || refreshing}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  days === d
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Empty State Warning */}
        {!hasData && (
          <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6 mb-8 flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-bold text-xl mb-2">No Data Available</h3>
              <p className="text-white/80 mb-4">
                Your analytics dashboard is empty because there are no sessions in the database yet.
              </p>
              <ul className="text-white/70 space-y-2 text-sm list-disc list-inside">
                <li>Generate tokens via the <span className="text-purple-400 font-mono">/generate-token</span> endpoint</li>
                <li>Create repair plans via the <span className="text-purple-400 font-mono">/generate-plan</span> endpoint</li>
                <li>Track downloads via the <span className="text-purple-400 font-mono">/track-download</span> endpoint</li>
              </ul>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">

          <StatCard
            icon={Globe}  
            title="Unique Visitors"
            value={analytics?.unique_visitors || 0}
            subtitle="Different IP addresses"
            color="text-orange-400"
          />

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

        {hasData && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Success Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 font-medium">AI Success Rate</span>
                  <span className="text-2xl font-bold text-green-400">
                    {analytics?.ai_requests && analytics.ai_requests > 0
                      ? Math.round(((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                    style={{
                      width: `${analytics?.ai_requests && analytics.ai_requests > 0
                        ? ((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100
                        : 0}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 font-medium">Token → AI Request Rate</span>
                  <span className="text-2xl font-bold text-blue-400">
                    {analytics?.tokens_generated && analytics.tokens_generated > 0
                      ? Math.round((analytics.ai_requests / analytics.tokens_generated) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                    style={{
                      width: `${analytics?.tokens_generated && analytics.tokens_generated > 0
                        ? (analytics.ai_requests / analytics.tokens_generated) * 100
                        : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {analytics?.recent_errors && analytics.recent_errors.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
              Recent Errors
            </h2>
            
            <div className="space-y-3">
              {analytics.recent_errors.map((err: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 hover:bg-red-500/20 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                    <span className="text-red-400 font-mono text-xs sm:text-sm">
                      {new Date(err.timestamp).toLocaleString()}
                    </span>
                    <span className="text-white/60 text-sm">{err.issue}</span>
                  </div>
                  <p className="text-white/80 text-sm">{err.error}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;










// import { useState, useEffect } from 'react';
// import { TrendingUp, Zap, AlertCircle, Download, Users, Clock, RefreshCw } from 'lucide-react';

// interface AnalyticsData {
//   tokens_generated: number;
//   ai_requests: number;
//   agent_downloads: number;
//   ai_errors: number;
//   error_rate: number;
//   human_help_requests: number;
//   total_events: number;
//   recent_errors: Array<{
//     timestamp: string;
//     issue: string;
//     error: string;
//   }>;
// }

// const AnalyticsDashboard = () => {
//   const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [days, setDays] = useState(7);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchAnalytics();
//   }, [days]);

//   const fetchAnalytics = async (isRefresh = false) => {
//     try {
//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }
      
//       // Send API key directly (backend handles URL decoding)
//       const apiKey = '6G4xjZrP7IebKXnVvNQwphH0VvQdXqv9nTjKFXLae+M=';
      
//       const response = await fetch(
//         `https://techfixai-backend.onrender.com/analytics?key=${encodeURIComponent(apiKey)}&days=${days}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to fetch analytics');
//       }
      
//       const data = await response.json();
//       setAnalytics(data);
//       setError(null);
      
//       console.log('✅ Analytics loaded:', data);
//     } catch (err: any) {
//       console.error('❌ Analytics error:', err);
//       setError(err.message || 'Failed to load analytics');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
//           <div className="text-white text-xl">Loading analytics...</div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//         <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg max-w-md w-full">
//           <AlertCircle className="w-8 h-8 mb-2 mx-auto" />
//           <p className="text-center font-semibold mb-2">Error Loading Analytics</p>
//           <p className="text-sm text-center mb-4">{error}</p>
//           <button
//             onClick={() => fetchAnalytics()}
//             className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Stat Card Component
//   const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
//     <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all hover:scale-105 duration-300">
//       <div className="flex items-center justify-between mb-4">
//         <Icon className={`w-8 h-8 ${color}`} />
//         <span className="text-3xl font-bold text-white">{value.toLocaleString()}</span>
//       </div>
//       <h3 className="text-white/80 font-medium mb-1">{title}</h3>
//       {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
//             <p className="text-white/60">Track your AI Tech Repair performance</p>
//           </div>
          
//           <div className="flex gap-2 flex-wrap">
//             {[7, 14, 30].map((d) => (
//               <button
//                 key={d}
//                 onClick={() => setDays(d)}
//                 disabled={loading || refreshing}
//                 className={`px-4 py-2 rounded-lg transition-all font-medium ${
//                   days === d
//                     ? 'bg-purple-500 text-white shadow-lg'
//                     : 'bg-white/10 text-white/80 hover:bg-white/20'
//                 }`}
//               >
//                 {d} Days
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
//           <StatCard
//             icon={Users}
//             title="Tokens Generated"
//             value={analytics?.tokens_generated || 0}
//             subtitle="New sessions created"
//             color="text-blue-400"
//           />
          
//           <StatCard
//             icon={Zap}
//             title="AI Requests"
//             value={analytics?.ai_requests || 0}
//             subtitle="Total repair plans generated"
//             color="text-yellow-400"
//           />
          
//           <StatCard
//             icon={Download}
//             title="Agent Downloads"
//             value={analytics?.agent_downloads || 0}
//             subtitle="Desktop app installations"
//             color="text-green-400"
//           />
          
//           <StatCard
//             icon={AlertCircle}
//             title="AI Errors"
//             value={analytics?.ai_errors || 0}
//             subtitle={`${analytics?.error_rate || 0}% error rate`}
//             color="text-red-400"
//           />
          
//           <StatCard
//             icon={Users}
//             title="Human Help Requests"
//             value={analytics?.human_help_requests || 0}
//             subtitle="Escalations to technician"
//             color="text-purple-400"
//           />
          
//           <StatCard
//             icon={Clock}
//             title="Total Events"
//             value={analytics?.total_events || 0}
//             subtitle={`Last ${days} days`}
//             color="text-cyan-400"
//           />
//         </div>

//         {/* Success Metrics */}
//         <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
//           <h2 className="text-2xl font-bold text-white mb-6">Success Metrics</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* AI Success Rate */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-white/80 font-medium">AI Success Rate</span>
//                 <span className="text-2xl font-bold text-green-400">
//                   {analytics?.ai_requests && analytics.ai_requests > 0
//                     ? Math.round(((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100)
//                     : 0}%
//                 </span>
//               </div>
//               <div className="h-4 bg-white/10 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
//                   style={{
//                     width: `${analytics?.ai_requests && analytics.ai_requests > 0
//                       ? ((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100
//                       : 0}%`
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Token Conversion Rate */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <span className="text-white/80 font-medium">Token → AI Request Rate</span>
//                 <span className="text-2xl font-bold text-blue-400">
//                   {analytics?.tokens_generated && analytics.tokens_generated > 0
//                     ? Math.round((analytics.ai_requests / analytics.tokens_generated) * 100)
//                     : 0}%
//                 </span>
//               </div>
//               <div className="h-4 bg-white/10 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
//                   style={{
//                     width: `${analytics?.tokens_generated && analytics.tokens_generated > 0
//                       ? (analytics.ai_requests / analytics.tokens_generated) * 100
//                       : 0}%`
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Errors */}
//         {analytics?.recent_errors && analytics.recent_errors.length > 0 && (
//           <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
//             <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
//               <AlertCircle className="w-6 h-6 text-red-400" />
//               Recent Errors
//             </h2>
            
//             <div className="space-y-3">
//               {analytics.recent_errors.map((err: any, idx: number) => (
//                 <div
//                   key={idx}
//                   className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 hover:bg-red-500/20 transition-colors"
//                 >
//                   <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
//                     <span className="text-red-400 font-mono text-xs sm:text-sm">
//                       {new Date(err.timestamp).toLocaleString()}
//                     </span>
//                     <span className="text-white/60 text-sm">{err.issue}</span>
//                   </div>
//                   <p className="text-white/80 text-sm">{err.error}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Refresh Button */}
//         <div className="flex justify-center">
//           <button
//             onClick={() => fetchAnalytics(true)}
//             disabled={refreshing}
//             className="px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
//           >
//             <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
//             {refreshing ? 'Refreshing...' : 'Refresh Data'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;































// import { useState, useEffect } from 'react';
// import { TrendingUp, Zap, AlertCircle, Download, Users, Clock } from 'lucide-react';

// const AnalyticsDashboard = () => {
//   const [analytics, setAnalytics] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [days, setDays] = useState(7);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchAnalytics();
//   }, [days]);

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);
      
//       // URL encode the API key to handle special characters (+, =)
//       const apiKey = encodeURIComponent('6G4xjZrP7IebKXnVvNQwphH0VvQdXqv9nTjKFXLae+M=');
      
//       const response = await fetch(
//         `https://techfixai-backend.onrender.com/analytics?key=${apiKey}&days=${days}`
//       );
      
//       if (!response.ok) throw new Error('Failed to fetch analytics');
      
//       const data = await response.json();
//       setAnalytics(data);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading analytics...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="bg-red-500/20 border border-red-500 text-white p-6 rounded-lg">
//           <AlertCircle className="w-8 h-8 mb-2" />
//           <p>Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
//     <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all">
//       <div className="flex items-center justify-between mb-4">
//         <Icon className={`w-8 h-8 ${color}`} />
//         <span className="text-2xl font-bold text-white">{value}</span>
//       </div>
//       <h3 className="text-white/80 font-medium mb-1">{title}</h3>
//       {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
//             <p className="text-white/60">Track your AI Tech Repair performance</p>
//           </div>
          
//           <div className="flex gap-2">
//             {[7, 14, 30].map((d) => (
//               <button
//                 key={d}
//                 onClick={() => setDays(d)}
//                 className={`px-4 py-2 rounded-lg transition-all ${
//                   days === d
//                     ? 'bg-purple-500 text-white'
//                     : 'bg-white/10 text-white/80 hover:bg-white/20'
//                 }`}
//               >
//                 {d} Days
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <StatCard
//             icon={Users}
//             title="Tokens Generated"
//             value={analytics?.tokens_generated || 0}
//             subtitle="New sessions created"
//             color="text-blue-400"
//           />
          
//           <StatCard
//             icon={Zap}
//             title="AI Requests"
//             value={analytics?.ai_requests || 0}
//             subtitle="Total repair plans generated"
//             color="text-yellow-400"
//           />
          
//           <StatCard
//             icon={Download}
//             title="Agent Downloads"
//             value={analytics?.agent_downloads || 0}
//             subtitle="Desktop app installations"
//             color="text-green-400"
//           />
          
//           <StatCard
//             icon={AlertCircle}
//             title="AI Errors"
//             value={analytics?.ai_errors || 0}
//             subtitle={`${analytics?.error_rate || 0}% error rate`}
//             color="text-red-400"
//           />
          
//           <StatCard
//             icon={Users}
//             title="Human Help Requests"
//             value={analytics?.human_help_requests || 0}
//             subtitle="Escalations to technician"
//             color="text-purple-400"
//           />
          
//           <StatCard
//             icon={Clock}
//             title="Total Events"
//             value={analytics?.total_events || 0}
//             subtitle={`Last ${days} days`}
//             color="text-cyan-400"
//           />
//         </div>

//         {/* Recent Errors */}
//         {analytics?.recent_errors && analytics.recent_errors.length > 0 && (
//           <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//             <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
//               <AlertCircle className="w-6 h-6 text-red-400" />
//               Recent Errors
//             </h2>
            
//             <div className="space-y-3">
//               {analytics.recent_errors.map((err: any, idx: number) => (
//                 <div
//                   key={idx}
//                   className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <span className="text-red-400 font-mono text-sm">
//                       {new Date(err.timestamp).toLocaleString()}
//                     </span>
//                     <span className="text-white/60 text-sm">{err.issue}</span>
//                   </div>
//                   <p className="text-white/80">{err.error}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Success Rate Chart */}
//         <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
//           <h2 className="text-2xl font-bold text-white mb-4">Success Metrics</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Success Rate */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-white/80">AI Success Rate</span>
//                 <span className="text-2xl font-bold text-green-400">
//                   {analytics?.ai_requests > 0
//                     ? Math.round(((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100)
//                     : 0}%
//                 </span>
//               </div>
//               <div className="h-4 bg-white/10 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
//                   style={{
//                     width: `${analytics?.ai_requests > 0
//                       ? ((analytics.ai_requests - analytics.ai_errors) / analytics.ai_requests) * 100
//                       : 0}%`
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Conversion Rate */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-white/80">Token → AI Request Rate</span>
//                 <span className="text-2xl font-bold text-blue-400">
//                   {analytics?.tokens_generated > 0
//                     ? Math.round((analytics.ai_requests / analytics.tokens_generated) * 100)
//                     : 0}%
//                 </span>
//               </div>
//               <div className="h-4 bg-white/10 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
//                   style={{
//                     width: `${analytics?.tokens_generated > 0
//                       ? (analytics.ai_requests / analytics.tokens_generated) * 100
//                       : 0}%`
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Refresh Button */}
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={fetchAnalytics}
//             className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
//           >
//             <TrendingUp className="w-5 h-5" />
//             Refresh Data
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;
