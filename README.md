## Noise

3D every(where) noise javascript class for all your noise needs.

- seeded noise
- scaling, pow
- fBM noise
- erosion-like fBM
- domain warping
- ridges, billows
- stepped noise
- combined noise
- tileable noise

- set properties of noise to own noise object (e.g. set noise.scale = new Noise());

### Get noise value

```javascript
let value = noise.get(x, y, z);
```

OR

```javascript
// vector has {x, y, z} properties
let value = noise.get(vector);
```

### demos

[simple p5 1D noise](https://flo-bit.github.io/every-noise/demos/p5-1d-noise.html)
[simple p2 2D noise](https://flo-bit.github.io/every-noise/demos/p5-2d-noise.html)

[tileable 1D noise](https://flo-bit.github.io/every-noise/demos/p5-tileable-1d-noise.html)
[tileable 2D noise](https://flo-bit.github.io/every-noise/demos/p5-tileable-2d-noise.html)

[fbm 1D noise](https://flo-bit.github.io/every-noise/demos/p5-fbm-1d-noise.html)
[fbm 2D noise](https://flo-bit.github.io/every-noise/demos/p5-fbm-2d-noise.html)

### coming soon

- [ ] 3D noise on sphere

- [ ] seeded noise
- [ ] erosion 2D noise
- [ ] erosion on sphere

- [ ] 2D stepped noise

- [ ] pixi noise flow field

- [ ] performance test
