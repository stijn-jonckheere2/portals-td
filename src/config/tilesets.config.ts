import { TilesetConfig } from 'src/app/game/interfaces/tileset-config.interface';

export const tilesetsConfig: { [key: string]: TilesetConfig } = {
  grassland: {
    key: 'tiles-nature', // choose yourself, used by phaser
    id: 'rpg_nature_tileset_embedded', // must match the name of the tileset in Tiled
    url: 'assets/tilesets/rpg_nature_tileset.png', // url to the tileset asset
    mapKey: 'grassland-map',
    mapUrl: 'assets/maps/grassland.json',
  },
  kingInTheNorth: {
    key: 'tiles-ice', // choose yourself, used by phaser
    id: 'rpg_ice_tileset', // must match the name of the tileset in Tiled
    url: 'assets/tilesets/rpg_ice_tileset.png', // url to the tileset asset
    mapKey: 'king-in-the-north-map',
    mapUrl: 'assets/maps/king-in-the-north.json',
  },
  sewers: {
    key: 'tiles-sewers', // choose yourself, used by phaser
    id: 'sewer_tileset', // must match the name of the tileset in Tiled
    url: 'assets/tilesets/sewer_tileset.png', // url to the tileset asset
    mapKey: 'sewers-map',
    mapUrl: 'assets/maps/sewers.json',
  },
}
