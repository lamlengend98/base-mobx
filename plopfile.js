module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Tạo một component mới',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tên của component:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-component/Component/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/style.ts',
        templateFile: 'plop-component/Component/styles.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t, {{pascalCase name}}`,
      },
    ],
  });
  plop.setGenerator('context', {
    description: 'Tạo một context mới',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tên của context:',
      },
      {
        type: 'input',
        name: 'provider',
        message: 'Tên của provider:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/tools/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-component/Context/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/tools/{{pascalCase name}}/context.ts',
        templateFile: 'plop-component/Context/context.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/tools/{{pascalCase name}}/types.ts',
        templateFile: 'plop-component/Context/types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{pascalCase provider}}.ts',
        templateFile: 'plop-component/Hook/use-hook.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/hooks/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{pascalCase provider}}';`,
      },
    ],
  });
  plop.setGenerator('screen', {
    description: 'Tạo một screen mới',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Tên của Screen:',
      },
      {
        type: 'input',
        name: 'route',
        message: 'Tên của Route:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-component/Screen/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/types.ts',
        templateFile: 'plop-component/Screen/types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/styles.ts',
        templateFile: 'plop-component/Screen/styles.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/component/.gitkeep',
      },
      {
        type: 'append',
        path: 'src/screens/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{pascalCase name}}';`,
      },
      {
        type: 'append',
        path: 'src/stack/routes.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\t{{pascalCase route}} = '{{pascalCase name}}',`,
      },
    ],
  });
};
