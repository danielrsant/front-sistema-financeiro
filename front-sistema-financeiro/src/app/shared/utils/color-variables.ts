export interface ColorVariable {
  id: number,
  description: string,
  light: string;
  default: string;
  contrast: string;
}

export const colorVariables: Record<string, ColorVariable> = {
  '#009688': { // Teal,
    id: 1,
    description: 'Verde',
    light: 'rgba(0, 150, 136, 0.1)',
    default: 'rgb(0, 150, 136)',
    contrast: 'rgb(255, 255, 255)'
  },
  '#00BCD4': { // Cyan
    id: 2,
    description: 'Ciano',
    light: 'rgba(0, 188, 212, 0.1)',
    default: 'rgb(0, 188, 212)',
    contrast: 'rgb(255, 255, 255)'
  },
  '#3F51B5': { // Dark Blue
    id: 3,
    description: 'Azul Escuro',
    light: 'rgba(41, 80, 164, 0.1)',
    default: 'rgb(41, 80, 164)',
    contrast: 'rgb(255, 255, 255)'
  },
  '#9C27B0': { // Purple
    id: 4,
    description: 'Roxo',
    light: 'rgba(156, 39, 176, 0.1)',
    default: 'rgb(156, 39, 176)',
    contrast: 'rgb(255, 255, 255)'
  },
  '#E91E63': { // Pink
    id: 5,
    description: 'Rosa',
    light: 'rgba(233, 30, 99, 0.1)',
    default: 'rgb(233, 30, 99)',
    contrast: 'rgb(255, 255, 255)'
  },
  '#F44336': { // Red
    id: 6,
    description: 'Vermelho',
    light: 'rgba(244, 67, 54, 0.1)',
    default: 'rgb(244, 67, 54)',
    contrast: 'rgb(255, 255, 255)',
  },
  '#FF9800': { // Amber
    id: 7,
    description: 'Laranja',
    light: 'rgba(255, 152, 0, 0.1)',
    default: 'rgb(255, 152, 0)',
    contrast: 'rgb(255, 255, 255)',
  },
};
