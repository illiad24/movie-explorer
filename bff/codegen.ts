import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.ts',
  generates: {
    './src/generated/resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../context.js#Context',
        // NodeNext requires explicit .js extensions in imports
        emitLegacyCommonJSImports: false,
      },
    },
  },
};

export default config;
