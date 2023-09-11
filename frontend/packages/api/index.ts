import { config } from '@formswizard/config'
import { OpenAPI, DefaultService } from './codegen'

OpenAPI.BASE = config.server.backend;

export const api = DefaultService
