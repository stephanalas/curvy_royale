export default class Button {
  constructor(x, y, label, scene, callback) {
    const button = scene.add
      .text(x, y, label)
      .setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: 'dodgerBlue' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => callback())
      .on('pointerover', () => button.setStyle({ fill: 'cornsilk' }))
      .on('pointerout', () => button.setStyle({ fill: 'grey' }));
  }
}
