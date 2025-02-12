import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { SensorDataOutSchema } from '@/app/lib/definitions';
import { z } from 'zod';

// Infer TypeScript type from the Zod schema
type SensorDataOut = z.infer<typeof SensorDataOutSchema>;

export default async function SensorDataChart({
  data,
}: {
  data: SensorDataOut[];
}) {
  const chartHeight = 350;

  // Generate Y-axis labels and the top label for scaling
  const { yAxisLabels, topLabel } = generateYAxis(data, 'temperature'); // Replace 'temperature' with any key relevant to your data

  if (!data || data.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Sensor Data Report
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {data.map((point) => (
            <div key={point.recorded_at} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * (point.temperature ?? 0)}px`, // Handle optional field safely
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {new Date(point.recorded_at).toLocaleDateString('en-US', { month: 'short' })}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
