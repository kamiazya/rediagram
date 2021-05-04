import Ajv, { JSONSchemaType } from 'ajv';

import { CommonRediagramFormatMeta } from './types';

const metaSchema: JSONSchemaType<CommonRediagramFormatMeta> = {
  type: 'object',
  properties: {
    dir: {
      type: 'string',
      nullable: true,
    },
    format: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
};

const validate = new Ajv({ strict: false }).compile(metaSchema);

export function isValidMeta(metaLike?: unknown): metaLike is CommonRediagramFormatMeta {
  return validate(metaLike);
}
