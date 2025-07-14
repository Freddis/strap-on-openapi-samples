import { OpenApiMethod } from "strap-on-openapi";
import { openApi } from "../../openApi";
import { AppRouteType } from "../../types/AppRouteType";
import { carValidator } from "../../../types/Car";

export const getCars = openApi.factory.createRoute({
  type: AppRouteType.Member,
  method: OpenApiMethod.GET,
  path: "/",
  description: "Returns list of cars in stock",
  validators: {
    response: carValidator.array().openapi({ description: "List of cars" }),
  },
  handler: async () => {
    const car1 = {
      name: "Z4",
      make: "BMW",
      averageDriverIQ: 80,
      updatedAt: new Date(),
    };
    const car2 = {
      name: "Supra",
      make: "Tayota",
      averageDriverIQ: 130,
      updatedAt: new Date(),
    };
    return [car1, car2];
  },
});
