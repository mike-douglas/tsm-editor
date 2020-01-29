const fonts = {
  '--page-font': '"Avenir", Helvetica, Arial, sans-serif',
  '--panel-font': '"Courier New", Courier, monospace',
};

const sizes = {
  '--size-normal': '1.25em',
  '--size-large': '1.8em',
  '--size-medium': '1.6em',
  '--size-small': '0.9em',
  '--size-extrasmall': '0.8em',
  '--size-tiny': '0.7em',

  '--panel-border': '3px',

  '--sep-border': '1px',

  '--padding': '0.5em',
  '--padding-large': '1.0em',
  '--padding-extralarge': '1.75em',
  '--padding-normal': '0.75em',
  '--padding-small': '0.25em',
};

// https://coolors.co/2a363b-e84a5f-ff847c-33658a-86bbd8
const colors = {
  '--page-bg': '#2A363B',
  '--panel-bg': 'rgba(0, 0, 0, 0.1)',

  '--float-bg-hover': '#33658A',
  '--float-bg': '#1F282B',

  '--float-border-color': '#214158',
  '--panel-border-color': '#33658A',
  '--sep-border-color': '#2F5C7E',

  '--text-normal': '#FFF3F3',
  '--text-faded': '#D8DADB',
  '--text-error': '#E84A5F',
  '--link-light': '#86BBD8',
  '--link-loud': '#86BBD8',
  '--link-mid': '#FF847C',
};

export default { ...fonts, ...colors, ...sizes };
