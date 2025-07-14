import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getCarsOptions } from "open-api-client/@tanstack/react-query.gen";

export const Route = createFileRoute("/")({
  component: FrontPage,
});

function FrontPage() {
  const carsResponse = useQuery(getCarsOptions())
  if(carsResponse.isLoading){
    return <div>loading...</div>
  }
  if(!carsResponse.data){
    return <div>Error!</div>
  }

  return (
    <div>
      List of cars:
      {carsResponse.data.map((car) => (
        <div key={car.name}>
          {car.make}:{car.name}
        </div>
      ))}
    </div>
  );
}
