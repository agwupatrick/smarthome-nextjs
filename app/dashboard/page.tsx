import { Card } from '@/app/ui/dashboard/cards';
import SensorChart from '@/app/ui/dashboard/sensor-chart'; 
import LatestMessages from '@/app/ui/dashboard/latest-messages';
import { lusitana } from '@/app/ui/fonts';
import { SensorData, Message } from '@/app/lib/definitions';

export default async function Page({
  sensorData,
  latestMessages,
}: {
  sensorData: SensorData[];
  latestMessages: Message[];
}) {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Example cards could be added here to show summary statistics */}
        {/* <Card title="Temperature Avg" value={averageTemperature} type="temperature" /> */}
        {/* <Card title="Humidity Avg" value={averageHumidity} type="humidity" /> */}
        {/* <Card title="Motion Detections" value={motionDetections} type="motion" /> */}
        {/* <Card title="Gas Alerts" value={gasAlerts} type="alerts" /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Sensor data chart component */}
        {/*<SensorChart sensorData={sensorData} />*/}

        {/* Latest messages component */}
        {/*<LatestMessages latestMessages={latestMessages} />*/}
      </div>
    </main>
  );
}
