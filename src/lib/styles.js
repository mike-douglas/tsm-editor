const fonts = {
  '--page-font': '"Avenir", Helvetica, Arial, sans-serif',
  '--panel-font': '"Courier New", Courier, monospace',
};

const sizes = {
  '--size-normal': '1.25em',
  '--size-large': '1.8em',
  '--size-medium': '1.6em',
  '--size-small': '0.9em',

  '--panel-border': '3px',

  '--padding': '0.5em',
  '--padding-large': '1.0em',
  '--padding-extralarge': '1.5em',
  '--padding-normal': '0.5em',
  '--padding-small': '0.25em',
};

const colors = {
  '--panel-bg': 'rgb(33, 33, 34)',

  '--panel-border-color': 'rgb(20, 40, 73)',

  '--text-normal': 'rgb(240, 240, 240)',
  '--text-faded': 'rgb(140, 140, 140)',
  '--text-error': 'red',
};

export default { ...fonts, ...colors, ...sizes };
