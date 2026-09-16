export type TileUnit = 'imperial' | 'metric';

export interface TileInput {
  unit: TileUnit;
  roomLength: string; // feet (imperial) or meters (metric)
  roomWidth: string;  // feet (imperial) or meters (metric)
  tileLength: string; // inches (imperial) or cm (metric)
  tileWidth: string;  // inches (imperial) or cm (metric)
  wastePercent: string;
}

export interface TileResult {
  unit: TileUnit;
  roomAreaSqFtOrM2: number;
  tileAreaSqInOrCm2: number;
  tileAreaSqFtOrM2: number;
  exactTiles: number;
  baseTilesNeeded: number;
  wastePercent: number;
  recommendedTiles: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateTile(input: TileInput): TileResult {
  const { unit } = input;
  const rlStr = (input.roomLength ?? '').trim();
  const rwStr = (input.roomWidth ?? '').trim();
  const tlStr = (input.tileLength ?? '').trim();
  const twStr = (input.tileWidth ?? '').trim();
  const wasteStr = (input.wastePercent ?? '').trim();

  if (rlStr === '' || rwStr === '' || tlStr === '' || twStr === '') {
    return {
      unit,
      roomAreaSqFtOrM2: 0,
      tileAreaSqInOrCm2: 0,
      tileAreaSqFtOrM2: 0,
      exactTiles: 0,
      baseTilesNeeded: 0,
      wastePercent: 0,
      recommendedTiles: 0,
      calculationSteps: [],
      errorMessage: 'Please enter room dimensions and tile dimensions.',
    };
  }

  const roomLength = parseFloat(rlStr);
  const roomWidth = parseFloat(rwStr);
  const tileLength = parseFloat(tlStr);
  const tileWidth = parseFloat(twStr);
  const wastePercent = wasteStr === '' ? 10 : parseFloat(wasteStr);

  if (isNaN(roomLength) || roomLength <= 0 || isNaN(roomWidth) || roomWidth <= 0) {
    return {
      unit,
      roomAreaSqFtOrM2: 0,
      tileAreaSqInOrCm2: 0,
      tileAreaSqFtOrM2: 0,
      exactTiles: 0,
      baseTilesNeeded: 0,
      wastePercent: 0,
      recommendedTiles: 0,
      calculationSteps: [],
      errorMessage: 'Room length and width must be positive numbers greater than zero.',
    };
  }

  if (isNaN(tileLength) || tileLength <= 0 || isNaN(tileWidth) || tileWidth <= 0) {
    return {
      unit,
      roomAreaSqFtOrM2: 0,
      tileAreaSqInOrCm2: 0,
      tileAreaSqFtOrM2: 0,
      exactTiles: 0,
      baseTilesNeeded: 0,
      wastePercent: 0,
      recommendedTiles: 0,
      calculationSteps: [],
      errorMessage: 'Tile length and width must be positive numbers greater than zero.',
    };
  }

  if (isNaN(wastePercent) || wastePercent < 0 || wastePercent > 100) {
    return {
      unit,
      roomAreaSqFtOrM2: 0,
      tileAreaSqInOrCm2: 0,
      tileAreaSqFtOrM2: 0,
      exactTiles: 0,
      baseTilesNeeded: 0,
      wastePercent: 0,
      recommendedTiles: 0,
      calculationSteps: [],
      errorMessage: 'Waste percentage must be between 0% and 100% (typically 10% for straight grid, 15% for diagonal layout).',
    };
  }

  let roomAreaSqFtOrM2 = 0;
  let tileAreaSqInOrCm2 = 0;
  let tileAreaSqFtOrM2 = 0;
  let exactTiles = 0;

  if (unit === 'imperial') {
    // Room in feet, tile in inches
    roomAreaSqFtOrM2 = roomLength * roomWidth; // sq ft
    tileAreaSqInOrCm2 = tileLength * tileWidth; // sq in
    tileAreaSqFtOrM2 = tileAreaSqInOrCm2 / 144; // sq ft per tile
    exactTiles = roomAreaSqFtOrM2 / tileAreaSqFtOrM2;
  } else {
    // Room in meters, tile in cm
    roomAreaSqFtOrM2 = roomLength * roomWidth; // m²
    tileAreaSqInOrCm2 = tileLength * tileWidth; // cm²
    tileAreaSqFtOrM2 = tileAreaSqInOrCm2 / 10000; // m² per tile
    exactTiles = roomAreaSqFtOrM2 / tileAreaSqFtOrM2;
  }

  const baseTilesNeeded = Math.ceil(exactTiles);
  const recommendedTiles = Math.ceil(exactTiles * (1 + wastePercent / 100));

  const roomUnit = unit === 'imperial' ? 'sq ft' : 'm²';
  const tileSmallUnit = unit === 'imperial' ? 'sq in' : 'cm²';
  const lDim = unit === 'imperial' ? 'ft' : 'm';
  const tDim = unit === 'imperial' ? 'in' : 'cm';

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return {
    unit,
    roomAreaSqFtOrM2,
    tileAreaSqInOrCm2,
    tileAreaSqFtOrM2,
    exactTiles,
    baseTilesNeeded,
    wastePercent,
    recommendedTiles,
    calculationSteps: [
      `Total room surface area: ${fmt(roomLength, 1)} ${lDim} × ${fmt(roomWidth, 1)} ${lDim} = ${fmt(roomAreaSqFtOrM2)} ${roomUnit}`,
      `Single tile coverage: ${tileLength} ${tDim} × ${tileWidth} ${tDim} = ${fmt(tileAreaSqInOrCm2)} ${tileSmallUnit} (${fmt(tileAreaSqFtOrM2, 4)} ${roomUnit})`,
      `Exact tiles required: ${fmt(roomAreaSqFtOrM2)} ÷ ${fmt(tileAreaSqFtOrM2, 4)} = ${fmt(exactTiles, 2)} tiles (round up: ${baseTilesNeeded})`,
      `Recommended purchase with ${wastePercent}% waste factor: ceil(${fmt(exactTiles, 2)} × ${(1 + wastePercent / 100).toFixed(2)}) = ${recommendedTiles} tiles`,
    ],
  };
}
