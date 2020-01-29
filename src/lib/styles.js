const fonts = {
  '--page-font': '"Avenir", Helvetica, Arial, sans-serif',
  '--panel-font': '"Courier New", Courier, monospace',
};

const sizes = {
  '--size-normal': '1.3em',
  '--size-large': '1.8em',
  '--size-medium': '1.6em',
  '--size-small': '0.9em',

  '--panel-border': '1px',

  '--padding': '0.5em',
  '--padding-large': '1.0em',
  '--padding-normal': '0.5em',
  '--padding-small': '0.25em',
};

const colors = {
  '--panel-bg': 'rgb(33, 33, 34)',

  '--panel-border-color': 'transparent',

  '--text-normal': 'rgb(240, 240, 240)',
  '--text-faded': 'rgb(140, 140, 140)',
  '--text-error': 'red',
};

export default { ...fonts, ...colors, ...sizes };
