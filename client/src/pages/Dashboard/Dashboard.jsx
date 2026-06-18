import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import { getJobStats } from "../../services/JobService";

function Dashboard() {

  // STATE HERE
  const [stats, setStats] = useState({
    Applied: 0,
    Interview: 0,
    Rejected: 0,
    Offer: 0,
  });

  const [loading, setLoading] = useState(true);

  // FETCH DATA HERE
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getJobStats();

        console.log(data);

        setStats(data.stats);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // LOADING CHECK HERE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  // RETURN HERE
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
  
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>
  
        <p className="text-slate-400 mt-2">
          Track your job search smarter with AI.
        </p>
  
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <StatCard
            title="Applied"
            value={stats.Applied}
          />
  
          <StatCard
            title="Interview"
            value={stats.Interview}
          />
  
          <StatCard
            title="Offer"
            value={stats.Offer}
          />
  
          <StatCard
            title="Rejected"
            value={stats.Rejected}
          />
        </div>
  
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            AI Career Insight 🤖
          </h2>
  
          <p className="text-slate-300">
            Dashboard is now connected to live
            MongoDB data. Next we will add
            charts, recent applications, and
            Gemini AI insights.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Dashboard; 