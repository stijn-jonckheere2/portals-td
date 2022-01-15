import { TilesetConfig } from 'src/app/game/interfaces/tileset-config.interface';

export const tilesetsConfig: { [key: string]: TilesetConfig } = {
  nature: {
    key: 'tiles-nature', // choose yourself, used by phaser
    id: 'rpg_nature_tileset_embedded', // must match the name of the tileset in Tiled
    url: 'assets/tilesets/rpg_nature_tileset.png', // url to the tileset asset
  }
}
