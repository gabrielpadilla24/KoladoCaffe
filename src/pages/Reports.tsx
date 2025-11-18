import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import DashboardLayout from "../layouts/DashboardLayout";
import Chart from "react-apexcharts";

interface Pedido {
  id: number;
  monto_total: number;
  activa: boolean;
  ultimo_envio: string | null;
  since: string | null; // nueva columna
}

interface MonthlyRevenue {
  month: string;
  total: number;
}

const Reports: React.FC = () => {
  const [ingresosTotales, setIngresosTotales] = useState<number>(0);
  const [clientesActivos, setClientesActivos] = useState<number>(0);
  const [clientesTotales, setClientesTotales] = useState<number>(0);
  const [ingresosMensuales, setIngresosMensuales] = useState<MonthlyRevenue[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data, error } = await supabase
          .from("pedidos")
          .select("id, monto_total, activa, ultimo_envio, since");

        if (error) throw error;
        if (!data) return;

        const pedidos = data as Pedido[];

        // 🔹 Totales
        const total = pedidos.length;
        const activos = pedidos.filter((p) => p.activa).length;
        const ingresos = pedidos
          .filter((p) => p.activa)
          .reduce((acc, p) => acc + (p.monto_total || 0), 0);

        setClientesTotales(total);
        setClientesActivos(activos);
        setIngresosTotales(ingresos);

        // 🔹 Calcular ingresos acumulativos por mes (últimos 6 meses)
        const ahora = new Date();
        const ultimos6Meses: MonthlyRevenue[] = [];

        for (let i = 5; i >= 0; i--) {
          const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
          const nombreMes = fecha.toLocaleString("es-CO", { month: "short" });

          const ingresosMes = pedidos
            .filter((p) => {
              if (!p.since) return false;
              const inicio = new Date(`${p.since}T00:00:00`);
              // ✅ si la suscripción empezó antes o durante este mes y sigue activa, acumula
              return (
                inicio <= fecha &&
                (p.activa || new Date(p.ultimo_envio || "") >= fecha)
              );
            })
            .reduce((acc, p) => acc + (p.monto_total || 0), 0);

          ultimos6Meses.push({
            month: nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1),
            total: ingresosMes,
          });
        }

        setIngresosMensuales(ultimos6Meses);
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const tasaRetencion =
    clientesTotales > 0
      ? ((clientesActivos / clientesTotales) * 100).toFixed(1)
      : "0";

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center text-[#4A2C2A] mt-10">
          Cargando reportes y análisis...
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
        Reportes y Análisis
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#A77B5D]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Ingresos Totales Activos
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">
            ${ingresosTotales.toLocaleString("es-CO")}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Suma de todas las suscripciones activas
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#8C5E58]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Clientes Activos
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">{clientesActivos}</p>
          <p className="text-sm text-gray-500 mt-1">
            De un total de {clientesTotales}
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl border-l-4 border-[#DAB49D]">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Tasa de Retención
          </h2>
          <p className="text-3xl font-bold text-[#4A2C2A]">{tasaRetencion}%</p>
          <p className="text-sm text-gray-500 mt-1">Objetivo: 90%</p>
        </div>
      </div>

      {/* 📈 Gráfico de líneas acumulativo */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-[#4A2C2A] mb-4">
          Ingresos Totales (Últimos 6 Meses)
        </h2>

        <Chart
          type="line"
          height={300}
          series={[
            {
              name: "Ingresos acumulados",
              data: ingresosMensuales.map((m) => m.total),
            },
          ]}
          options={{
            chart: { toolbar: { show: false }, zoom: { enabled: false } },
            stroke: { curve: "smooth", width: 3 },
            xaxis: {
              categories: ingresosMensuales.map((m) => m.month),
              labels: { style: { colors: "#4A2C2A" } },
            },
            yaxis: {
              labels: {
                style: { colors: "#4A2C2A" },
                formatter: (val) => `$${val.toLocaleString("es-CO")}`,
              },
            },
            colors: ["#A77B5D"],
            markers: { size: 5, colors: ["#A77B5D"], strokeColors: "#fff" },
            tooltip: {
              y: { formatter: (val) => `$${val.toLocaleString("es-CO")}` },
            },
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
