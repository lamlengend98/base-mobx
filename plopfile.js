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
        templateFile: 'plop-component/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/style.ts',
      },
    ],
  });
};
