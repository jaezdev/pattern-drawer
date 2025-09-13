# Contributing to Pattern Drawer Library

Thank you for your interest in contributing to the Pattern Drawer Library! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Provide a clear description of the problem
- Include steps to reproduce the issue
- Add browser/environment information
- Include code examples when possible

### Suggesting Features
- Open an issue with the "enhancement" label
- Describe the feature and its use case
- Explain why it would be valuable
- Consider backward compatibility

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Follow our coding standards**
5. **Add tests for new functionality**
6. **Update documentation**
7. **Commit with clear messages**
8. **Submit a pull request**

## 📁 Project Structure

```
src/
├── core/           # Core library classes
│   ├── PatternDrawer.js
│   └── EventEmitter.js
├── utils/          # Utility functions
│   └── index.js
├── styles/         # CSS modules
│   ├── base.css
│   ├── components.css
│   ├── responsive.css
│   └── themes/
└── index.js        # Main entry point
```

## 🔧 Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jaezdev/pattern-drawer.git
   cd pattern-drawer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build the library**
   ```bash
   npm run build
   ```

## 🎨 Coding Standards

### JavaScript
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### CSS
- Use CSS custom properties for theming
- Follow BEM naming convention for classes
- Ensure responsive design
- Test accessibility features

### Commits
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
type(scope): description

feat(core): add new pattern validation
fix(styles): resolve theme switching issue
docs(readme): update installation guide
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Test in multiple browsers
- Test on mobile devices
- Verify accessibility features

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments to code
- Update CHANGELOG.md
- Create examples for new functionality

## 🔍 Code Review Process

1. All changes require a pull request
2. At least one maintainer review required
3. All tests must pass
4. Documentation must be updated
5. Backward compatibility preserved

## 🚀 Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Tag release
5. Deploy to npm (maintainers only)

## 📋 Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] No breaking changes (or clearly documented)
- [ ] Examples work correctly

## 🎯 Priority Areas

We especially welcome contributions in:
- Performance optimizations
- Accessibility improvements
- New themes and presets
- Framework integrations (React, Vue, Angular)
- Browser compatibility fixes
- Mobile experience enhancements

## 📞 Questions?

- Open a GitHub discussion
- Check existing issues
- Contact maintainers

Thank you for contributing! 🙏