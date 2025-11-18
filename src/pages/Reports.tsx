import DashboardLayout from "../layouts/DashboardLayout";

const Reports = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
        Reportes y Análisis
      </h1>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#A77B5D]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Ingresos Mensuales
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">$4.2M</p>
          <p className="text-sm text-gray-500 mt-1">+8% vs. mes anterior</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#8C5E58]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Clientes Activos
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">128</p>
          <p className="text-sm text-gray-500 mt-1">+5 nuevos este mes</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#DAB49D]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Tasa de Retención
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">92%</p>
          <p className="text-sm text-gray-500 mt-1">Objetivo: 90%</p>
        </div>
      </div>

      {/* Gráfico de tendencias simuladas */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-[#4A2C2A] mb-4">
          Tendencia de Suscripciones (Últimos 6 Meses)
        </h2>

        {/* Gráfico simulado */}
        <div className="relative w-full h-64 bg-[#F5EFE7] rounded-lg flex items-end justify-between p-4">
          {["Jun", "Jul", "Ago", "Sep", "Oct", "Nov"].map((month, i) => {
            const heights = [40, 55, 75, 60, 80, 90]; // valores simulados
            return (
              <div key={month} className="flex flex-col items-center">
                <div
                  className="w-8 bg-[#A77B5D] rounded-t-lg"
                  style={{ height: `${heights[i]}%` }}
                ></div>
                <p className="text-sm mt-2 text-gray-600">{month}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabla de desempeño */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-[#4A2C2A] mb-4">
          Desempeño por Plan
        </h2>

        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-[#F5EFE7] text-[#4A2C2A]">
            <tr>
              <th className="py-3 px-4 text-left">Plan</th>
              <th className="py-3 px-4 text-left">Clientes</th>
              <th className="py-3 px-4 text-left">Ingresos (COP)</th>
              <th className="py-3 px-4 text-left">Crecimiento Mensual</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4">Básico</td>
              <td className="py-3 px-4">52</td>
              <td className="py-3 px-4">$1.3M</td>
              <td className="py-3 px-4 text-green-600 font-semibold">+4%</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">Estándar</td>
              <td className="py-3 px-4">46</td>
              <td className="py-3 px-4">$1.7M</td>
              <td className="py-3 px-4 text-green-600 font-semibold">+7%</td>
            </tr>
            <tr>
              <td className="py-3 px-4">Premium</td>
              <td className="py-3 px-4">30</td>
              <td className="py-3 px-4">$1.2M</td>
              <td className="py-3 px-4 text-yellow-600 font-semibold">+2%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
