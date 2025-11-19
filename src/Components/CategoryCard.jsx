const CategoryCard = ({ icon, name, color }) => {
  return (
    <div
      className={`bg-gradient-to-r ${color} p-6 rounded-2xl text-white shadow-lg hover:scale-105 transform transition text-center`}
    >
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold">{name}</h3>
    </div>
  );
};

export default CategoryCard;
