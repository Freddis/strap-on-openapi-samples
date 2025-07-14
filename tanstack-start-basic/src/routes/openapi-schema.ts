import { createFileRoute } from '@tanstack/react-router'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { openApi } from '~/api/openApi'

export const ServerRoute = createServerFileRoute('/openapi-schema').methods(openApi.wrappers.tanstackStart.createShemaMethods())