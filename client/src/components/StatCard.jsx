function StatCard({ title, value }) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <p className="text-slate-400">
          {title}
        </p>
  
        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>
      </div>
    );
  }
  
  export default StatCard;