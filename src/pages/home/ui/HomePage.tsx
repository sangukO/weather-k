import { WeatherDashboard } from "@/widgets/weather-dashboard";

export const HomePage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <WeatherDashboard />
    </main>
  );
};
