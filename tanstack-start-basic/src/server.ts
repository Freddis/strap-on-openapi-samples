import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import {createRouter} from './router';
import { openApi } from './api/openApi';
import { openApiRoutes } from './api/openApiRoutes';

openApi.addRouteMap(openApiRoutes)
export default createStartHandler({
  createRouter,
})(defaultStreamHandler);
