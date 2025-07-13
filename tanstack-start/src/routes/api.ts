import { createServerFileRoute } from '@tanstack/react-start/server'
import { openApi } from '~/api/openApi'

const methods = openApi.wrappers.tanstackStart.getOpenApiRootMethods()
export const ServerRoute = createServerFileRoute('/api').methods(methods)