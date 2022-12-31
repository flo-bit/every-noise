/**
 * vector class for 2D, 3D and 4D vectors
 *
 */
class Vector {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {Vector}
   * @constructor
   */
  constructor(x, y, z, w) {
    if (x != undefined && typeof x == "object" && x.x != undefined) {
      this.copy(x);
    } else {
      this.set(x || 0, y || 0, z, w);
    }

    this.isVector = true;

    this.is2D = z == undefined;
    this.is3D = !this.is2D && w == undefined;
    this.is4D = !this.is2D && !this.is3D;
    return this;
  }
  copy(vec) {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    this.w = vec.w;

    return this;
  }
  clone() {
    return new Vector(this.x, this.y, this.z, this.w);
  }
  set(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.copy(x);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.set(x, x);
      if (this.is3D) this.set(x, x, x);
      if (this.is4D) this.set(x, x, x, x);
    }
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  add(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.add(x.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.add(x, x);
      if (this.is3D) this.add(x, x, x);
      if (this.is4D) this.add(x, x, x, x);
    }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    this.w += w || 0;
    return this;
  }
  sub(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.sub(x.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.sub(x, x);
      if (this.is3D) this.sub(x, x, x);
      if (this.is4D) this.sub(x, x, x, x);
    }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    this.w -= w || 0;
    return this;
  }
  mult(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.mult(x.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.mult(x, x);
      if (this.is3D) this.mult(x, x, x);
      if (this.is4D) this.mult(x, x, x, x);
    }
    this.x *= x || 0;
    this.y *= y || 0;
    this.z *= z || 0;
    this.w *= w || 0;
    return this;
  }
  div(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.div(m.x, x.y, x.z, x.w);
    }
    if (y == undefined && z == undefined && w == undefined) {
      if (this.is2D) this.div(x, x);
      if (this.is3D) this.div(x, x, x);
      if (this.is4D) this.div(x, x, x, x);
    }
    this.x /= x || 0;
    this.y /= y || 0;
    this.z /= z || 0;
    this.w /= w || 0;
    return this;
  }
  dot(vec) {
    return (
      this.x * vec.x +
      this.y * vec.y +
      (this.z != undefined ? this.z * vec.z : 0) +
      (this.w != undefined ? this.w * vec.w : 0)
    );
  }
  // 3D only
  cross(vec) {
    if (!this.is3D || !vec.is3D)
      console.warn("cross(vec) only supports 3D vectors");
    return new Vector(
      this.y * vec.z - this.z * vec.y,
      this.z * vec.x - this.x * vec.z,
      this.x * vec.y - this.y * vec.x
    );
  }

  dist(x, y, z, w) {
    if (typeof x != "number" && x.x != undefined) {
      return this.dist(x.x, x.y, x.z, x.w);
    }
    let sum = 0;
    let dx = this.x - x;
    sum += dx * dx;
    let dy = (this.y || 0) - (y || 0);
    sum += dy * dy;
    let dz = (this.z || 0) - (z || 0);
    sum += dz * dz;
    let dw = (this.w || 0) - (w || 0);
    sum += dw * dw;
    return Math.sqrt(sum);
  }
  distance(x, y, z, w) {
    return this.dist(x, y, z, w);
  }
  distanceTo(x, y, z, w) {
    return this.dist(x, y, z, w);
  }
  length() {
    return Math.sqrt(
      this.x * this.x +
        this.y * this.y +
        (this.z || 0) * (this.z || 0) +
        (this.w || 0) * (this.w || 0)
    );
  }

  setLength(l) {
    this.mult(l / this.length());
    return this;
  }
  limit(l) {
    let length = this.length();
    if (length > l) this.mult(length / l);
    return this;
  }

  // 2d only
  heading() {
    if (!this.is2D) console.warn("heading() only supports 2D vectors");

    return Math.atan2(this.x, this.y);
  }
  // 2d only
  rotate(a) {
    if (!this.is2D) console.warn("rotate(a) only supports 2D vectors");

    let ca = Math.cos(a);
    let sa = Math.sin(a);
    this.set(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
    return this;
  }

  angleBetween(vec) {
    let d = this.dot(vec);
    let l = this.length() * vec.length();
    return Math.acos(d / l);
  }
  angleTo(vec) {
    return this.angleBetween(vec);
  }
  equals(vec) {
    return (
      this.x == vec.x && this.y == vec.y && this.z == vec.z && this.w == vec.w
    );
  }

  normalize() {
    this.setLength(1);
    return this;
  }
  mag() {
    return this.length();
  }
  setMag(m) {
    this.setLength(m);
    return this;
  }
  manhattanLength() {
    return this.x + this.y + (this.z || 0) + (this.w || 0);
  }
  lerp(vec, a) {
    let dx = vec.x - this.x;
    let dy = vec.y - this.y;
    let dz = vec.z - this.z;
    let dw = vec.w - this.w;
    this.add(dx * a, dy * a, dz * a, dw * a);
    return this;
  }

  stringDescription() {
    let dimension = this.is2D ? "2D" : this.is3D ? "3D" : "4D";
    let str = dimension + " vec (" + this.x + ", " + this.y;
    if (this.z != undefined) str += ", " + this.z;
    if (this.w != undefined) str += ", " + this.w;
    str += ")";
    return str;
  }

  // 2d vector from angle and optional length (default length 1)
  static fromAngle2D(a, l) {
    let v = new Vector(Math.cos(a), Math.sin(a));
    if (l) v.setLength(l);
    return v;
  }

  // random 2d vector with length between 0 and 1
  // or set length
  static random2D(l, random = Math.random) {
    let v = new Vector(random() * 2 - 1, random() * 2 - 1);
    while (v.length() > 1) {
      v.set(random() * 2 - 1, random() * 2 - 1);
    }
    if (l) v.setLength(l);
    return v;
  }

  // random 3d vector with length between 0 and 1
  // or set length
  static random3D(l, random = Math.random) {
    let v = new Vector(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1);
    while (v.length() > 1) {
      v.set(random() * 2 - 1, random() * 2 - 1, random() * 2 - 1);
    }
    if (l) v.setLength(l);
    return v;
  }

  static breakIntoParts(a, b, parts) {
    if (a == undefined || b == undefined || !a.isVector || !b.isVector) return;

    parts = Math.floor(parts || 2);
    let arr = [a.clone()];
    for (let i = 1; i < parts; i++) {
      arr.push(a.clone().lerp(b, i / parts));
    }
    arr.push(b.clone());
    return arr;
  }
}

/** Srand
 * @param {number} seed
 */
(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        /*!
         * jsrand - https://github.com/DomenicoDeFelice/jsrand
         *
         * Copyright (c) 2014-2020 Domenico De Felice
         * Released under the MIT License
         *
         * @license
         */ "use strict";
        function _toConsumableArray(a) {
          return (
            _arrayWithoutHoles(a) ||
            _iterableToArray(a) ||
            _unsupportedIterableToArray(a) ||
            _nonIterableSpread()
          );
        }
        function _nonIterableSpread() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        function _unsupportedIterableToArray(a, b) {
          if (a) {
            if ("string" == typeof a) return _arrayLikeToArray(a, b);
            var c = Object.prototype.toString.call(a).slice(8, -1);
            return (
              "Object" === c && a.constructor && (c = a.constructor.name),
              "Map" === c || "Set" === c
                ? Array.from(a)
                : "Arguments" === c ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
                ? _arrayLikeToArray(a, b)
                : void 0
            );
          }
        }
        function _iterableToArray(a) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(a))
            return Array.from(a);
        }
        function _arrayWithoutHoles(a) {
          if (Array.isArray(a)) return _arrayLikeToArray(a);
        }
        function _arrayLikeToArray(a, b) {
          (null == b || b > a.length) && (b = a.length);
          for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
          return d;
        }
        function _typeof(a) {
          "@babel/helpers - typeof";
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (a) {
                    return typeof a;
                  }
                : function (a) {
                    return a &&
                      "function" == typeof Symbol &&
                      a.constructor === Symbol &&
                      a !== Symbol.prototype
                      ? "symbol"
                      : typeof a;
                  }),
            _typeof(a)
          );
        }
        function Srand(a) {
          null == a ? this.randomize() : this.seed(a);
        }
        (Srand.prototype = {}),
          (Srand.seed = Srand.prototype.seed =
            function (a) {
              return null == a
                ? this._seed
                : ((this._mz = 123456789), (this._mw = this._seed = a));
            }),
          (Srand.randomize = Srand.prototype.randomize =
            function () {
              return this.seed(1 + Math.floor(4294967295 * Math.random()));
            }),
          (Srand.getState = Srand.prototype.getState =
            function () {
              return { seed: this._seed, mz: this._mz, mw: this._mw };
            }),
          (Srand.setState = Srand.prototype.setState =
            function (a) {
              if (
                null == a ||
                "object" !== _typeof(a) ||
                "number" != typeof a.seed ||
                "number" != typeof a.mz ||
                "number" != typeof a.mw
              )
                throw new Error("Invalid state.");
              (this._seed = a.seed), (this._mz = a.mz), (this._mw = a.mw);
            }),
          (Srand.random = Srand.prototype.random =
            function () {
              null == this._seed && this.randomize();
              var a = this._mz,
                b = this._mw;
              (a = 4294967295 & (36969 * (65535 & a) + (a >> 16))),
                (b = 4294967295 & (18e3 * (65535 & b) + (b >> 16))),
                (this._mz = a),
                (this._mw = b);
              var c = (4294967295 & ((a << 16) + b)) / 4294967296;
              return 0.5 + c;
            }),
          (Srand.inRange = Srand.prototype.inRange =
            function (c, a) {
              return c + this.random() * (a - c);
            }),
          (Srand.intInRange = Srand.prototype.intInRange =
            function (a, b) {
              return a + Math.floor(this.random() * (b - a + 1));
            }),
          (Srand.choice = Srand.prototype.choice =
            function (a) {
              if (0 === a.length)
                throw new Error(
                  "Cannot choose random element from empty array."
                );
              var b = this.intInRange(0, a.length - 1);
              return a[b];
            }),
          (Srand.choices = Srand.prototype.choices =
            function (a, b) {
              for (var c = Array(b), d = 0; d < b; d++) c[d] = this.choice(a);
              return c;
            }),
          (Srand.sample = Srand.prototype.sample =
            function (a, b) {
              if (b > a.length)
                throw new Error("Sample size cannot exceed population size.");
              if (b === a.length) return _toConsumableArray(a);
              for (
                var c, d = a.length - 1, e = Array(b), f = {}, g = 0;
                g < b;
                g++
              ) {
                do c = this.intInRange(0, d);
                while (f[c]);
                (e[g] = a[c]), (f[c] = !0);
              }
              return e;
            }),
          (Srand.shuffle = Srand.prototype.shuffle =
            function (a) {
              for (var d = a.length - 1; 0 < d; d--) {
                var b = this.intInRange(0, d - 1),
                  c = a[d];
                (a[d] = a[b]), (a[b] = c);
              }
              return a;
            }),
          (Srand._oldSrand = void 0),
          (Srand.noConflict = function () {
            return Srand;
          }),
          (module.exports = Srand);
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        "use strict";
        var _jsrand = _interopRequireDefault(require("./jsrand.js"));
        function _interopRequireDefault(a) {
          return a && a.__esModule ? a : { default: a };
        }
        (_jsrand.default._oldSrand = window.Srand),
          (_jsrand.default.noConflict = function () {
            return (window.Srand = _jsrand.default._oldSrand), _jsrand.default;
          }),
          (window.Srand = _jsrand.default);
      },
      { "./jsrand.js": 1 },
    ],
  },
  {},
  [2]
);

/**
 * every-noise.js
 */
class Noise {
  static defaultUp = new Vector(0, 1, 0);

  /*
   * simplex-noise.js by Jonas Wagner
   *
   * version 4.0.1 slightly modified
   */
  static Simplex = (function () {
    /*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.

 Copyright (c) 2022 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
    // these #__PURE__ comments help uglifyjs with dead code removal
    //
    const F2 = /*#__PURE__*/ 0.5 * (Math.sqrt(3.0) - 1.0);
    const G2 = /*#__PURE__*/ (3.0 - Math.sqrt(3.0)) / 6.0;
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    const F4 = /*#__PURE__*/ (Math.sqrt(5.0) - 1.0) / 4.0;
    const G4 = /*#__PURE__*/ (5.0 - Math.sqrt(5.0)) / 20.0;
    // I'm really not sure why this | 0 (basically a coercion to int)
    // is making this faster but I get ~5 million ops/sec more on the
    // benchmarks across the board or a ~10% speedup.
    const fastFloor = (x) => Math.floor(x) | 0;
    const grad2 = /*#__PURE__*/ new Float64Array([
      1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1,
      0, -1,
    ]);
    // double seems to be faster than single or int's
    // probably because most operations are in double precision
    const grad3 = /*#__PURE__*/ new Float64Array([
      1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1,
      0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
    ]);
    // double is a bit quicker here as well
    const grad4 = /*#__PURE__*/ new Float64Array([
      0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1,
      -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1,
      0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1,
      0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1,
      -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1,
      -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0,
    ]);
    /**
     * Creates a 2D noise function
     * @param random the random function that will be used to build the permutation table
     * @returns {NoiseFunction2D}
     */
    function createNoise2D(random = Math.random) {
      const perm = buildPermutationTable(random);
      // precalculating this yields a little ~3% performance improvement.
      const permGrad2x = new Float64Array(perm).map((v) => grad2[(v % 12) * 2]);
      const permGrad2y = new Float64Array(perm).map(
        (v) => grad2[(v % 12) * 2 + 1]
      );
      return function noise2D(x, y) {
        // if(!isFinite(x) || !isFinite(y)) return 0;
        let n0 = 0; // Noise contributions from the three corners
        let n1 = 0;
        let n2 = 0;
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y) * F2; // Hairy factor for 2D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t; // Unskew the cell origin back to (x,y) space
        const Y0 = j - t;
        const x0 = x - X0; // The x,y distances from the cell origin
        const y0 = y - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
          i1 = 1;
          j1 = 0;
        } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        else {
          i1 = 0;
          j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        const y2 = y0 - 1.0 + 2.0 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        const ii = i & 255;
        const jj = j & 255;
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
          const gi0 = ii + perm[jj];
          const g0x = permGrad2x[gi0];
          const g0y = permGrad2y[gi0];
          t0 *= t0;
          // n0 = t0 * t0 * (grad2[gi0] * x0 + grad2[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
          n0 = t0 * t0 * (g0x * x0 + g0y * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
          const gi1 = ii + i1 + perm[jj + j1];
          const g1x = permGrad2x[gi1];
          const g1y = permGrad2y[gi1];
          t1 *= t1;
          // n1 = t1 * t1 * (grad2[gi1] * x1 + grad2[gi1 + 1] * y1);
          n1 = t1 * t1 * (g1x * x1 + g1y * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
          const gi2 = ii + 1 + perm[jj + 1];
          const g2x = permGrad2x[gi2];
          const g2y = permGrad2y[gi2];
          t2 *= t2;
          // n2 = t2 * t2 * (grad2[gi2] * x2 + grad2[gi2 + 1] * y2);
          n2 = t2 * t2 * (g2x * x2 + g2y * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70.0 * (n0 + n1 + n2);
      };
    }
    /**
     * Creates a 3D noise function
     * @param random the random function that will be used to build the permutation table
     * @returns {NoiseFunction3D}
     */
    function createNoise3D(random = Math.random) {
      const perm = buildPermutationTable(random);
      // precalculating these seems to yield a speedup of over 15%
      const permGrad3x = new Float64Array(perm).map((v) => grad3[(v % 12) * 3]);
      const permGrad3y = new Float64Array(perm).map(
        (v) => grad3[(v % 12) * 3 + 1]
      );
      const permGrad3z = new Float64Array(perm).map(
        (v) => grad3[(v % 12) * 3 + 2]
      );
      return function noise3D(x, y, z) {
        let n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y + z) * F3; // Very nice and simple skew factor for 3D
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const k = fastFloor(z + s);
        const t = (i + j + k) * G3;
        const X0 = i - t; // Unskew the cell origin back to (x,y,z) space
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = x - X0; // The x,y,z distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
          if (y0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          } // X Y Z order
          else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          } // X Z Y order
          else {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          } // Z X Y order
        } else {
          // x0<y0
          if (y0 < z0) {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } // Z Y X order
          else if (x0 < z0) {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } // Y Z X order
          else {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          } // Y X Z order
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        const x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
        const y2 = y0 - j2 + 2.0 * G3;
        const z2 = z0 - k2 + 2.0 * G3;
        const x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
        const y3 = y0 - 1.0 + 3.0 * G3;
        const z3 = z0 - 1.0 + 3.0 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) n0 = 0.0;
        else {
          const gi0 = ii + perm[jj + perm[kk]];
          t0 *= t0;
          n0 =
            t0 *
            t0 *
            (permGrad3x[gi0] * x0 +
              permGrad3y[gi0] * y0 +
              permGrad3z[gi0] * z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) n1 = 0.0;
        else {
          const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1]];
          t1 *= t1;
          n1 =
            t1 *
            t1 *
            (permGrad3x[gi1] * x1 +
              permGrad3y[gi1] * y1 +
              permGrad3z[gi1] * z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) n2 = 0.0;
        else {
          const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2]];
          t2 *= t2;
          n2 =
            t2 *
            t2 *
            (permGrad3x[gi2] * x2 +
              permGrad3y[gi2] * y2 +
              permGrad3z[gi2] * z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) n3 = 0.0;
        else {
          const gi3 = ii + 1 + perm[jj + 1 + perm[kk + 1]];
          t3 *= t3;
          n3 =
            t3 *
            t3 *
            (permGrad3x[gi3] * x3 +
              permGrad3y[gi3] * y3 +
              permGrad3z[gi3] * z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to stay just inside [-1,1]
        return 32.0 * (n0 + n1 + n2 + n3);
      };
    }
    /**
     * Creates a 4D noise function
     * @param random the random function that will be used to build the permutation table
     * @returns {NoiseFunction4D}
     */
    function createNoise4D(random = Math.random) {
      const perm = buildPermutationTable(random);
      // precalculating these leads to a ~10% speedup
      const permGrad4x = new Float64Array(perm).map((v) => grad4[(v % 32) * 4]);
      const permGrad4y = new Float64Array(perm).map(
        (v) => grad4[(v % 32) * 4 + 1]
      );
      const permGrad4z = new Float64Array(perm).map(
        (v) => grad4[(v % 32) * 4 + 2]
      );
      const permGrad4w = new Float64Array(perm).map(
        (v) => grad4[(v % 32) * 4 + 3]
      );
      return function noise4D(x, y, z, w) {
        let n0, n1, n2, n3, n4; // Noise contributions from the five corners
        // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
        const s = (x + y + z + w) * F4; // Factor for 4D skewing
        const i = fastFloor(x + s);
        const j = fastFloor(y + s);
        const k = fastFloor(z + s);
        const l = fastFloor(w + s);
        const t = (i + j + k + l) * G4; // Factor for 4D unskewing
        const X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
        const Y0 = j - t;
        const Z0 = k - t;
        const W0 = l - t;
        const x0 = x - X0; // The x,y,z,w distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        const w0 = w - W0;
        // For the 4D case, the simplex is a 4D shape I won't even try to describe.
        // To find out which of the 24 possible simplices we're in, we need to
        // determine the magnitude ordering of x0, y0, z0 and w0.
        // Six pair-wise comparisons are performed between each possible pair
        // of the four coordinates, and the results are used to rank the numbers.
        let rankx = 0;
        let ranky = 0;
        let rankz = 0;
        let rankw = 0;
        if (x0 > y0) rankx++;
        else ranky++;
        if (x0 > z0) rankx++;
        else rankz++;
        if (x0 > w0) rankx++;
        else rankw++;
        if (y0 > z0) ranky++;
        else rankz++;
        if (y0 > w0) ranky++;
        else rankw++;
        if (z0 > w0) rankz++;
        else rankw++;
        // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
        // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
        // impossible. Only the 24 indices which have non-zero entries make any sense.
        // We use a thresholding to set the coordinates in turn from the largest magnitude.
        // Rank 3 denotes the largest coordinate.
        // Rank 2 denotes the second largest coordinate.
        // Rank 1 denotes the second smallest coordinate.
        // The integer offsets for the second simplex corner
        const i1 = rankx >= 3 ? 1 : 0;
        const j1 = ranky >= 3 ? 1 : 0;
        const k1 = rankz >= 3 ? 1 : 0;
        const l1 = rankw >= 3 ? 1 : 0;
        // The integer offsets for the third simplex corner
        const i2 = rankx >= 2 ? 1 : 0;
        const j2 = ranky >= 2 ? 1 : 0;
        const k2 = rankz >= 2 ? 1 : 0;
        const l2 = rankw >= 2 ? 1 : 0;
        // The integer offsets for the fourth simplex corner
        const i3 = rankx >= 1 ? 1 : 0;
        const j3 = ranky >= 1 ? 1 : 0;
        const k3 = rankz >= 1 ? 1 : 0;
        const l3 = rankw >= 1 ? 1 : 0;
        // The fifth corner has all coordinate offsets = 1, so no need to compute that.
        const x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
        const y1 = y0 - j1 + G4;
        const z1 = z0 - k1 + G4;
        const w1 = w0 - l1 + G4;
        const x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
        const y2 = y0 - j2 + 2.0 * G4;
        const z2 = z0 - k2 + 2.0 * G4;
        const w2 = w0 - l2 + 2.0 * G4;
        const x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
        const y3 = y0 - j3 + 3.0 * G4;
        const z3 = z0 - k3 + 3.0 * G4;
        const w3 = w0 - l3 + 3.0 * G4;
        const x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
        const y4 = y0 - 1.0 + 4.0 * G4;
        const z4 = z0 - 1.0 + 4.0 * G4;
        const w4 = w0 - 1.0 + 4.0 * G4;
        // Work out the hashed gradient indices of the five simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        const ll = l & 255;
        // Calculate the contribution from the five corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0) n0 = 0.0;
        else {
          const gi0 = ii + perm[jj + perm[kk + perm[ll]]];
          t0 *= t0;
          n0 =
            t0 *
            t0 *
            (permGrad4x[gi0] * x0 +
              permGrad4y[gi0] * y0 +
              permGrad4z[gi0] * z0 +
              permGrad4w[gi0] * w0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0) n1 = 0.0;
        else {
          const gi1 = ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]];
          t1 *= t1;
          n1 =
            t1 *
            t1 *
            (permGrad4x[gi1] * x1 +
              permGrad4y[gi1] * y1 +
              permGrad4z[gi1] * z1 +
              permGrad4w[gi1] * w1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0) n2 = 0.0;
        else {
          const gi2 = ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]];
          t2 *= t2;
          n2 =
            t2 *
            t2 *
            (permGrad4x[gi2] * x2 +
              permGrad4y[gi2] * y2 +
              permGrad4z[gi2] * z2 +
              permGrad4w[gi2] * w2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0) n3 = 0.0;
        else {
          const gi3 = ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]];
          t3 *= t3;
          n3 =
            t3 *
            t3 *
            (permGrad4x[gi3] * x3 +
              permGrad4y[gi3] * y3 +
              permGrad4z[gi3] * z3 +
              permGrad4w[gi3] * w3);
        }
        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0) n4 = 0.0;
        else {
          const gi4 = ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]];
          t4 *= t4;
          n4 =
            t4 *
            t4 *
            (permGrad4x[gi4] * x4 +
              permGrad4y[gi4] * y4 +
              permGrad4z[gi4] * z4 +
              permGrad4w[gi4] * w4);
        }
        // Sum up and scale the result to cover the range [-1,1]
        return 27.0 * (n0 + n1 + n2 + n3 + n4);
      };
    }
    /**
     * Builds a random permutation table.
     * This is exported only for (internal) testing purposes.
     * Do not rely on this export.
     * @private
     */
    function buildPermutationTable(random) {
      const tableSize = 512;
      const p = new Uint8Array(tableSize);
      for (let i = 0; i < tableSize / 2; i++) {
        p[i] = i;
      }
      for (let i = 0; i < tableSize / 2 - 1; i++) {
        const r = i + ~~(random() * (256 - i));
        const aux = p[i];
        p[i] = p[r];
        p[r] = aux;
      }
      for (let i = 256; i < tableSize; i++) {
        p[i] = p[i - 256];
      }
      return p;
    }

    return {
      createNoise2D: createNoise2D,
      createNoise3D: createNoise3D,
      createNoise4D: createNoise4D,
    };
  })();

  static firstDefined(...arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== undefined) return arr[i];
    }
  }

  /**
   * create new Noise object
   *
   * @param {object} opts
   *
   * @property {number} seed - seed for the noise, if not provided, Math.random() will be used,
   * currently same results can only be guaranteed for newly created noise objects with same seed
   * (as opposed to an old noise object where you changed the seed)
   *
   * @property {number} min - minimun value of noise
   * @property {number} max - maximum value of noise
   *
   * @property {number} scale - scale of the noise
   * @property {number} power - power of the noise (1 = linear, 2 = quadratic, etc)
   * @property {Vector} shift - move noise in 2D, 3D or 4D space
   *
   * @property {number} octaves - number of layers for fbm noise
   * @property {number} gain - how much to multiply amplitude per layer
   * @property {number} lacunarity - how much to multiply scale per layer
   * @property {array} amps - array of amplitudes for each layer
   * @property {number} erosion - how much previous layers influence amplitude of later layers
   * @property {number} sharpness - billowed or rigded noise (0 = normal, 1 = billowed, -1 = ridged)
   * @property {number} steps - will turn noise into steps (integer, number of steps)
   *
   * @property {number} warp - how much to warp the noise
   * @property {number} warpNoise - noise to warp the noise with
   * @property {number} warp2 - second warp, can only be used if warp is used too
   * @property {number} warpNoise2 - second warp noise
   *
   * @property {boolean} invert - invert the noise
   * @property {boolean} abs - absolute value of the noise
   * @property {boolean} clamp - clamp the noise between min and max
   * @property {boolean} tileX - tile the noise in x direction
   * @property {boolean} tileY - tile the noise in y direction
   * @property {boolean} tile - tile the noise in all directions (will override tileX and tileY)
   *
   * @constructor
   */
  constructor(opts) {
    opts = opts || {};

    this.pos = new Vector(0, 0, 0);

    this._seed = Noise.firstDefined(opts.seed, opts.s, Math.random() * 1000000);
    this.prng = new Srand(this._seed);

    // fbm stuff
    // how many layers
    this.octaves = Noise.firstDefined(opts.octaves, opts.oct, 0);
    // how much to multiply amplitude per layer
    this.gain = Noise.firstDefined(opts.gain, opts.persistence, opts.per, 0.5);
    // how much to multiply scale per layer
    this.lacunarity = Noise.firstDefined(opts.lacunarity, opts.lac, 2);

    this.layers = undefined;
    this.noise2D = undefined;
    this.noise3D = undefined;
    this.noise4D = undefined;

    if (this.octaves > 0 || opts.layers != undefined) {
      this.layers = [];
      for (
        let i = 0;
        i < this.octaves || (opts.layers && i < opts.layers.length);
        i++
      ) {
        let settings =
          opts.layers != undefined && opts.layers.length > i
            ? opts.layers[i]
            : {};
        settings.seed = this.prng.inRange(0, 1000000000);

        if (opts.all) {
          for (let k of Object.keys(opts.all)) {
            settings[k] = opts.all[k];
          }
        }
        if (settings.isNoise != true) {
          this.layers.push(new Noise(settings));
        } else {
          this.layers.push(settings);
        }
      }
    } else {
      let random = this.prng.random.bind(this.prng);
      this.noise2D = Noise.Simplex.createNoise2D(random);
      this.noise3D = Noise.Simplex.createNoise3D(random);
      this.noise4D = Noise.Simplex.createNoise4D(random);
    }

    this.scale = Noise.firstDefined(opts.scale, opts.scl, 1);
    this.power = Noise.firstDefined(opts.power, opts.pow, 1);

    this.shift = Noise.firstDefined(
      opts.shift,
      new Vector(opts.x || 0.357, opts.y || 0.579, opts.z || 0.248, opts.w || 0)
    );

    // how much previous layers influence amplitude of later layers
    this.erosion = Noise.firstDefined(opts.erosion, opts.ero, 0);
    // how much to move x, y, z to calculate derivative
    // (x2 - x1) / delta, (y2 - y1) / delta, (z2 - z1) / delta
    this.delta = Noise.firstDefined(opts.delta, opts.del, 0.0001 * this.scale);

    // amp is also only used for fbm
    this.amp = Noise.firstDefined(opts.amplitude, opts.amp);

    this.sharpness = Noise.firstDefined(opts.sharpness, opts.sharp, 0);

    this.steps = opts.steps;

    this.min = Noise.firstDefined(opts.min, -1);
    this.max = Noise.firstDefined(opts.max, 1);

    this.combine = undefined;

    this.mod = opts.mod;

    this.warp = undefined;
    this.warp2 = undefined;
    this.warpNoise = undefined;
    this.warpNoise2 = undefined;

    if (opts.warp != undefined) {
      this.warp = opts.warp;

      if (opts.warpNoise) {
        this.warpNoise = opts.warpNoise;
        this.warpNoise.seed = this.prng.inRange(0, 1000000000);
        if (this.warpNoise.isNoise != true) {
          this.warpNoise = new Noise(opts.warpNoise);
        }
      }
    }
    if (opts.warp2 != undefined) {
      this.warp2 = opts.warp2;

      if (opts.warpNoise2) {
        this.warpNoise2 = opts.warpNoise2;
        if (this.warpNoise2.isNoise != true)
          this.warpNoise2 = new Noise(opts.warpNoise2);
      }
    }

    this.defaultUp = opts.defaultUp;

    if (opts.amps) {
      this.multiplyAmps(opts.amps);
    }

    // wether to use central position when calculating derivative
    this.central = opts.central;

    this.tileX = opts.tileX;
    this.tileY = opts.tileY;

    if (opts.tile) {
      this.tileX = true;
      this.tileY = true;
    }

    this.isNoise = true;

    // vector to store derivative, will be reused
    this.derivative = undefined;
  }

  get scale() {
    return this.getPropertyAtPosition("_scale", this.pos);
  }
  set scale(scale) {
    this._scale = scale;
    this.checkProperty("_scale");
  }

  get power() {
    return this.getPropertyAtPosition("_power", this.pos);
  }
  set power(power) {
    this._power = power;
    this.checkProperty("_power");
  }

  get octaves() {
    return this.getPropertyAtPosition("_octaves", this.pos);
  }
  set octaves(octaves) {
    this._octaves = octaves;
    this.checkProperty("_octaves");
  }

  get gain() {
    return this.getPropertyAtPosition("_gain", this.pos);
  }
  set gain(gain) {
    this._gain = gain;
    this.checkProperty("_gain");
  }

  get lacunarity() {
    return this.getPropertyAtPosition("_lacunarity", this.pos);
  }
  set lacunarity(lacunarity) {
    this._lacunarity = lacunarity;
    this.checkProperty("_lacunarity");
  }

  get erosion() {
    return this.getPropertyAtPosition("_erosion", this.pos);
  }
  set erosion(erosion) {
    this._erosion = erosion;
    this.checkProperty("_erosion");
  }

  get amp() {
    return this.getPropertyAtPosition("_amp", this.pos);
  }
  set amp(amp) {
    this._amp = amp;
    this.checkProperty("_amp");
  }

  get combine() {
    return this.getPropertyAtPosition("_combine", this.pos);
  }
  set combine(combine) {
    this._combine = combine;
    this.checkProperty("_combine");
  }

  get sharpness() {
    return this.getPropertyAtPosition("_sharpness", this.pos);
  }
  set sharpness(sharpness) {
    this._sharpness = sharpness;
    this.checkProperty("_sharpness");
  }

  get warp() {
    return this.getPropertyAtPosition("_warp", this.pos);
  }
  set warp(warp) {
    this._warp = warp;
    this.checkProperty("_warp");
  }

  get warp2() {
    return this.getPropertyAtPosition("_warp2", this.pos);
  }
  set warp2(warp2) {
    this._warp2 = warp2;
    this.checkProperty("_warp2");
  }

  get steps() {
    return this.getPropertyAtPosition("_steps", this.pos);
  }
  set steps(steps) {
    this._steps = steps;
    this.checkProperty("_steps");
  }

  get min() {
    return this.getPropertyAtPosition("_min", this.pos);
  }
  set min(min) {
    this._min = min;
    this.checkProperty("_min");
  }

  get max() {
    return this.getPropertyAtPosition("_max", this.pos);
  }
  set max(max) {
    this._max = max;
    this.checkProperty("_max");
  }

  get seed() {
    return this._seed;
  }
  set seed(seed) {
    this.setSeed(seed);
  }

  /**
   * set seed for noise object, will create new simplex noise objects
   * if no param given will generate random seed
   * @param {number} seed
   * @returns {number}
   */
  setSeed(seed) {
    this._seed = seed != undefined ? seed : Math.random() * 1000000000;

    if (this.prng) this.prng = new Srand(this._seed);
    let random = this.prng.random.bind(this.prng);
    if (this.noise2D) this.noise2D = new Noise.Simplex.createNoise2D(random);
    if (this.noise3D) this.noise3D = new Noise.Simplex.createNoise3D(random);
    if (this.noise4D) this.noise4D = new Noise.Simplex.createNoise4D(random);

    if (this.layers) {
      for (let i = 0; i < this.layers.length; i++) {
        this.layers[i].seed = this.prng.inRange(0, 1000000000);
      }
    }

    for (let k of Object.keys(this)) {
      if (this[k] != undefined && this[k].isNoise) {
        this[k].seed = this.prng.inRange(0, 1000000000);
      }
    }

    return seed;
  }

  /**
   * check if a property is a number or am object, if its an object
   * but not a noise object, convert it to a noise object
   * @param {string} key
   */
  checkProperty(key) {
    let v = this[key];
    if (v != undefined && typeof v != "number" && !v.isNoise) {
      if (v.seed == undefined) v.seed = this.seed;

      this[key] = new Noise(v);
    }
  }

  /**
   * get a property by key, if its a number return number
   * if its a noise object, return the value at position
   *
   * @param {string} key
   * @param {Vector} position
   * @returns {number}
   */
  getPropertyAtPosition(key, position) {
    let v = this[key];
    if (v == undefined) return;
    if (typeof v == "number") return v;
    if (v.isNoise)
      return position != undefined
        ? v.get(position.x, position.y, position.z, position.w)
        : v;
  }

  /**
   * shift noise field
   *
   * @param {number} dX
   * @param {number} dY
   * @param {number} dZ
   * @param {number} dW
   */
  shiftBy(dX, dY, dZ, dW) {
    this.shift.x += dX || 0;
    this.shift.y += dY || 0;
    this.shift.z += dZ || 0;
    this.shift.w += dW || 0;
  }

  /**
   * multiply amplitude of all layers by array of values
   * only works if noise object has layers
   *
   * @param {array} arr
   */
  multiplyAmps(arr) {
    if (this.layers == undefined) return;

    for (let i = 0; i < this.layers.length && i < arr.length; i++) {
      this.layers[i].amp *= arr[i];
    }
  }

  lerp(a, b, t) {
    return (b - a) * t + a;
  }

  tilePosition() {
    let x = this.pos.x;
    let y = this.pos.y;
    let newX = 0,
      newY = 0,
      newZ = 0,
      newW = 0;
    if (this.tileX) {
      newX = Math.sin(x * Math.PI * 2);
      newY = Math.cos(x * Math.PI * 2);
    }
    if (this.tileY) {
      newZ = Math.sin(y * Math.PI * 2);
      newW = Math.cos(y * Math.PI * 2);
    }
    if (this.tileX && !this.tileY) {
      this.pos.set(newX, newY + y);
    } else if (this.tileY && !this.tileX) {
      this.pos.set(newZ + x, newW);
    } else if (this.tileX && this.tileY) {
      this.pos.set(newX, newY, newZ, newW);
    }
  }

  warpPosition() {
    let warp = this.warp;
    if (warp == undefined || warp == 0) return;
    let x = this.pos.x,
      y = this.pos.y,
      z = this.pos.z,
      w = this.pos.w;

    if (this.warpNoise) this.warpNoise.pos.copy(this.pos);

    let noise = this.warpNoise || this;
    let scl = noise.scale;
    x +=
      noise.getFBM(
        x - 74.98 * scl,
        y + 41.33 * scl,
        z != undefined ? z + 76.56 * scl : undefined,
        undefined,
        true
      ) * warp;
    y +=
      noise.getFBM(
        x + 1.23 * scl,
        y + 5.79 * scl,
        z != undefined ? z + 12.85 * scl : undefined,
        undefined,
        true
      ) * warp;
    if (z != undefined) {
      z +=
        noise.getFBM(
          x + 11.47 * scl,
          y + 17.98 * scl,
          z + 23.56 * scl,
          undefined,
          true
        ) * warp;
    }
    if (w != undefined) {
      w +=
        noise.getFBM(
          x + 54.47 * scl,
          y + 34.98 * scl,
          z + 76.56 * scl,
          w + 45.98 * scl,
          true
        ) * warp;
    }

    let warp2 = this.warp2;
    if (warp2 == undefined || warp2 == 0) {
      this.pos.set(x, y, z, w);
      return;
    }

    if (this.warpNoise2) this.warpNoise2.pos.copy(this.pos);

    noise = this.warpNoise2 || this;
    scl = noise.scale;
    x +=
      noise.getFBM(
        x + 11.47 * scl,
        y + 17.98 * scl,
        undefined,
        undefined,
        true
      ) * warp2;
    y +=
      noise.getFBM(
        x - 73.98 * scl,
        y + 44.33 * scl,
        undefined,
        undefined,
        true
      ) * warp2;
    if (w != undefined) {
      z +=
        noise.getFBM(
          x + 11.23 * scl,
          y + 53.79 * scl,
          z + 96.31 * scl,
          undefined,
          true
        ) * warp2;
    }
    if (w != undefined) {
      w +=
        noise.getFBM(
          x + 11.23 * scl,
          y + 53.79 * scl,
          z + 96.31 * scl,
          w + 23.56 * scl,
          true
        ) * warp2;
    }

    this.pos.set(x, y, z, w);
  }

  getFBM(x, y, z, w, noErosion) {
    let scale = this.scale;

    // if no layers exit early
    if (this.layers == undefined) {
      // if object has simplex noise return result of that
      if (this.noise4D != undefined && w != undefined) {
        this.lastNoiseCall = "noise4D";
        return this.noise4D(x * scale, y * scale, z * scale, w * scale);
      }
      if (this.noise3D != undefined && z != undefined) {
        this.lastNoiseCall = "noise3D";
        return this.noise3D(x * scale, y * scale, z * scale);
      }
      if (this.noise2D != undefined) {
        this.lastNoiseCall = "noise2D";
        return this.noise2D(x * scale, y * scale);
      }
      // no data
      return 0;
    }
    // for calculating angle between derivative and tangent
    // when erosion > 0
    let up =
      this.defaultUp != undefined ? this.defaultUp(x, y, z) : Noise.defaultUp;

    let maxAmp = 1;
    let amp = 1,
      freq = scale;

    let lac = this.lacunarity;
    let gain = this.gain;

    // reuse vector
    this.sum = this.sum || new Vector();
    this.sum.set(0, 0, 0);

    let n = 0;
    let erosion = noErosion ? 0 : this.erosion;
    let octaves = this.octaves;
    for (let i = 0; i <= octaves && i < this.layers.length; i++) {
      let l = this.layers[i];
      let layerAmp = l.amp || 1;
      let val =
        l.get(
          x * freq,
          y * freq,
          z != undefined ? z * freq : undefined,
          w != undefined ? w * freq : undefined
        ) *
        amp *
        layerAmp;
      if (erosion > 0) {
        let d = l.getDerivative(x * freq, y * freq, z * freq);
        d.setLength(amp * layerAmp);

        this.sum.add(d);
        // calculate normalized angle between sum of derivatives and tangent, should be between 0 and 1
        let mult = Math.abs(1 - up.angleTo(this.sum) / Math.PI);

        n += val * (mult * erosion + 1 - erosion);
      } else {
        n += val;
      }
      amp *= gain;
      freq *= lac;
      maxAmp += amp * layerAmp;
    }
    return n / maxAmp;
  }

  /**
   *
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {number}
   */
  getNoise(x, y, z, w) {
    x = x || 0;
    y = y || 0;
    this.pos.set(
      x + this.shift.x,
      y + this.shift.y,
      z != undefined ? z + this.shift.z : undefined,
      w != undefined ? w + this.shift.w : undefined
    );

    if (this.tileX || this.tileY) this.tilePosition();
    if (this.warp || this.warp2) this.warpPosition();

    let norm = this.getFBM(this.pos.x, this.pos.y, this.pos.z, this.pos.w);

    let power = this.power;
    if (power && power != 1) {
      // convert to [0 - 1], apply power and back to [-1, 1]
      norm = (Math.pow((norm + 1) * 0.5, power) - 0.5) * 2;
      //norm = Math.pow(norm, power);
    }

    if (this.sharpness != undefined && this.sharpness != 0) {
      let sharp = this.sharpness;

      let billow = (Math.abs(norm) - 0.5) * 2;
      let ridged = (0.5 - Math.abs(norm)) * 2;

      norm = this.lerp(norm, billow, Math.max(0, sharp));
      norm = this.lerp(norm, ridged, Math.abs(Math.min(0, sharp)));
    }

    if (this.clamp) {
      norm = Math.min(norm, 1);
      norm = Math.max(norm, -1);
    }

    // modify with function
    if (this.mod) {
      norm = this.mod(norm, this.pos, this, up);
    }

    //combine with other noise:
    if (this.combine) {
      norm *= this.combine;
    }

    // turn into steps
    // (e.g. 2 steps => only 0 or 1, 3 steps => 0, 0.5 and 1)
    let steps = Math.round(this.steps);
    if (steps != undefined && steps > 1) {
      let s = (Math.floor((norm + 1) * steps * 0.5) / (steps - 1) - 0.5) * 2;
      return s;
    }

    return norm;
  }

  getDerivative(x, y, z, n) {
    // left side or central difference
    // very expensive (four/six noise calls), should be changed to analytical derivatives
    // see https://iquilezles.org/www/articles/morenoise/morenoise.htm

    n = n || this.get(x, y, z);
    let mov = this.delta;

    let dx =
      (this.central ? this.get(x - mov, y, z) : n) - this.get(x + mov, y, z);
    let dy =
      (this.central ? this.get(x, y - mov, z) : n) - this.get(x, y + mov, z);
    let dz =
      (this.central ? this.get(x, y, z - mov) : n) - this.get(x, y, z + mov);

    if (this.derivative == undefined) this.derivative = new Vector();
    this.derivative.set(dx, dy, dz);
    this.derivative.normalize();
    return this.derivative;
  }

  /**
   * converts from -1, 1 to min, max
   *
   * @param {number} norm
   * @returns {number}
   */
  mapNormalizedToMinMax(norm) {
    return (norm + 1) * 0.5 * (this.max - this.min) + this.min;
  }
  /**
   * converts from min, max to -1, 1
   * @param {number} minMax
   * @returns {number}
   */
  mapMinMaxToNormalized(minMax) {
    return ((minMax - this.min) / (this.max - this.min) - 0.5) * 2;
  }

  /**
   * function to get normalized noise value (between -1 and 1)
   * can be called either with x, y, z or with a vector
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {number}
   */
  getNormalized(x, y, z, w) {
    if (typeof x == "number") {
      return this.getNoise(x, y, z, w);
    }
    return this.getNoise(x.x, x.y, x.z, x.w);
  }

  /**
   * same as getNormalized
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {number}
   */
  getNorm(x, y, z, w) {
    return this.getNormalized(x, y, z, w);
  }

  /**
   * main function to get noise value
   * will return value between min and max
   * call either with x, y, z or with a vector
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {number}
   */
  get(x, y, z, w) {
    return this.mapNormalizedToMinMax(this.getNormalized(x, y, z, w));
  }
}
