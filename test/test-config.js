// -------------------------------
// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.

['.css', '.scss', '.png', '.jpg'].forEach(ext => {
  require.extensions[ext] = () => null;
});
