import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getCarsOptions } from "open-api-client/@tanstack/react-query.gen";

export const Route = createFileRoute("/cars/")({
  component: CarsPage,
});

function CarsPage() {
  const carsResponse = useQuery({
    ...getCarsOptions(),
    retry: 0,
  });
  if (carsResponse.isLoading) {
    return <div className="p-5">loading...</div>;
  }
  if (!carsResponse.data) {
    return <div className="p-5">Error! Not Authenticated</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-xl">List of cars:</h1>
      {carsResponse.data.map((car) => (
        <div key={car.name}>
          {car.make}:{car.name}
        </div>
      ))}
    </div>
  );
}
