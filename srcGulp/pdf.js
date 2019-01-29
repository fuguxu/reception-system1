"undefined" == typeof PDFJS && (("undefined" != typeof window ? window : this).PDFJS = {}), PDFJS.version = "1.1.159", PDFJS.build = "82536f8",
    function () {
        "use strict";

        function t(t) {
            PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.infos && console.log("Info: " + t)
        }

        function e(t) {
            PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.warnings && console.log("Warning: " + t)
        }

        function n(t) {
            throw PDFJS.verbosity >= PDFJS.VERBOSITY_LEVELS.errors && (console.log("Error: " + t), console.log(i())), L.notify(T.unknown), new Error(t)
        }

        function i() {
            try {
                throw new Error
            } catch (t) {
                return t.stack ? t.stack.split("\n").slice(2).join("\n") : ""
            }
        }

        function r(t, e) {
            t || n(e)
        }

        function a(t, e) {
            if (!e) return t;
            if (/^[a-z][a-z0-9+\-.]*:/i.test(e)) return e;
            var n;
            if ("/" === e.charAt(0)) return n = t.indexOf("://"), "/" === e.charAt(1) ? ++n : n = t.indexOf("/", n + 3), t.substring(0, n) + e;
            var i = t.length;
            i = (n = t.lastIndexOf("#")) >= 0 ? n : i, i = (n = t.lastIndexOf("?", i)) >= 0 ? n : i;
            var r = t.lastIndexOf("/", i);
            return t.substring(0, r + 1) + e
        }

        function s(t, e, n) {
            return Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !1
            }), n
        }

        function o(t) {
            r(null !== t && "object" == typeof t && void 0 !== t.length, "Invalid argument for bytesToString");
            var e = t.length;
            if (e < 8192) return String.fromCharCode.apply(null, t);
            for (var n = [], i = 0; i < e; i += 8192) {
                var a = Math.min(i + 8192, e),
                    s = t.subarray(i, a);
                n.push(String.fromCharCode.apply(null, s))
            }
            return n.join("")
        }

        function l(t) {
            r("string" == typeof t, "Invalid argument for stringToBytes");
            for (var e = t.length, n = new Uint8Array(e), i = 0; i < e; ++i) n[i] = 255 & t.charCodeAt(i);
            return n
        }

        function c(t) {
            return String.fromCharCode(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t)
        }

        function h() {
            var t = new Uint8Array(2);
            return t[0] = 1, 1 === new Uint16Array(t.buffer)[0]
        }

        function u() {
            var t = document.createElement("canvas");
            return t.width = t.height = 1, void 0 !== t.getContext("2d").createImageData(1, 1).data.buffer
        }

        function d(t) {
            return "number" == typeof t
        }

        function f(t) {
            return t instanceof Array
        }

        function p(t) {
            return "object" == typeof t && null !== t && void 0 !== t.byteLength
        }

        function A() {
            var t = {};
            return t.promise = new Promise(function (e, n) {
                t.resolve = e, t.reject = n
            }), t
        }

        function g(t, e) {
            this.name = t, this.comObj = e, this.callbackIndex = 1, this.postMessageTransfers = !0;
            var i = this.callbacksCapabilities = {},
                r = this.actionHandler = {};
            r.console_log = [function (t) {
                console.log.apply(console, t)
            }], r.console_error = [function (t) {
                console.error.apply(console, t)
            }], r._unsupported_feature = [function (t) {
                L.notify(t)
            }], e.onmessage = function (t) {
                var a = t.data;
                if (a.isReply) {
                    var s = a.callbackId;
                    if (a.callbackId in i) {
                        var o = i[s];
                        delete i[s], "error" in a ? o.reject(a.error) : o.resolve(a.data)
                    } else n("Cannot resolve callback " + s)
                } else if (a.action in r) {
                    var l = r[a.action];
                    a.callbackId ? Promise.resolve().then(function () {
                        return l[0].call(l[1], a.data)
                    }).then(function (t) {
                        e.postMessage({
                            isReply: !0,
                            callbackId: a.callbackId,
                            data: t
                        })
                    }, function (t) {
                        e.postMessage({
                            isReply: !0,
                            callbackId: a.callbackId,
                            error: t
                        })
                    }) : l[0].call(l[1], a.data)
                } else n("Unknown action from worker: " + a.action)
            }
        }

        function m(t, n, i) {
            var r = new Image;
            r.onload = function () {
                i.resolve(t, r)
            }, r.onerror = function () {
                i.resolve(t, null), e("Error during JPEG image loading")
            }, r.src = n
        }

        function v(t, e) {
            var n = document.createElement("canvas");
            return n.width = t, n.height = e, n
        }

        function b(t) {
            t.mozCurrentTransform || (t._originalSave = t.save, t._originalRestore = t.restore, t._originalRotate = t.rotate, t._originalScale = t.scale, t._originalTranslate = t.translate, t._originalTransform = t.transform, t._originalSetTransform = t.setTransform, t._transformMatrix = t._transformMatrix || [1, 0, 0, 1, 0, 0], t._transformStack = [], Object.defineProperty(t, "mozCurrentTransform", {
                get: function () {
                    return this._transformMatrix
                }
            }), Object.defineProperty(t, "mozCurrentTransformInverse", {
                get: function () {
                    var t = this._transformMatrix,
                        e = t[0],
                        n = t[1],
                        i = t[2],
                        r = t[3],
                        a = t[4],
                        s = t[5],
                        o = e * r - n * i,
                        l = n * i - e * r;
                    return [r / o, n / l, i / l, e / o, (r * a - i * s) / l, (n * a - e * s) / o]
                }
            }), t.save = function () {
                var t = this._transformMatrix;
                this._transformStack.push(t), this._transformMatrix = t.slice(0, 6), this._originalSave()
            }, t.restore = function () {
                var t = this._transformStack.pop();
                t && (this._transformMatrix = t, this._originalRestore())
            }, t.translate = function (t, e) {
                var n = this._transformMatrix;
                n[4] = n[0] * t + n[2] * e + n[4], n[5] = n[1] * t + n[3] * e + n[5], this._originalTranslate(t, e)
            }, t.scale = function (t, e) {
                var n = this._transformMatrix;
                n[0] = n[0] * t, n[1] = n[1] * t, n[2] = n[2] * e, n[3] = n[3] * e, this._originalScale(t, e)
            }, t.transform = function (e, n, i, r, a, s) {
                var o = this._transformMatrix;
                this._transformMatrix = [o[0] * e + o[2] * n, o[1] * e + o[3] * n, o[0] * i + o[2] * r, o[1] * i + o[3] * r, o[0] * a + o[2] * s + o[4], o[1] * a + o[3] * s + o[5]], t._originalTransform(e, n, i, r, a, s)
            }, t.setTransform = function (e, n, i, r, a, s) {
                this._transformMatrix = [e, n, i, r, a, s], t._originalSetTransform(e, n, i, r, a, s)
            }, t.rotate = function (t) {
                var e = Math.cos(t),
                    n = Math.sin(t),
                    i = this._transformMatrix;
                this._transformMatrix = [i[0] * e + i[2] * n, i[1] * e + i[3] * n, i[0] * -n + i[2] * e, i[1] * -n + i[3] * e, i[4], i[5]], this._originalRotate(t)
            })
        }

        function S(t) {
            var e, n, i, r, a = t.width,
                s = t.height,
                o = a + 1,
                l = new Uint8Array(o * (s + 1)),
                c = new Uint8Array([0, 2, 4, 0, 1, 0, 5, 4, 8, 10, 0, 8, 0, 2, 1, 0]),
                h = a + 7 & -8,
                u = t.data,
                d = new Uint8Array(h * s),
                f = 0;
            for (e = 0, r = u.length; e < r; e++)
                for (var p = 128, A = u[e]; p > 0;) d[f++] = A & p ? 0 : 255, p >>= 1;
            var g = 0;
            for (0 !== d[f = 0] && (l[0] = 1, ++g), n = 1; n < a; n++) d[f] !== d[f + 1] && (l[n] = d[f] ? 2 : 1, ++g), f++;
            for (0 !== d[f] && (l[n] = 2, ++g), e = 1; e < s; e++) {
                i = e * o, d[(f = e * h) - h] !== d[f] && (l[i] = d[f] ? 1 : 8, ++g);
                var m = (d[f] ? 4 : 0) + (d[f - h] ? 8 : 0);
                for (n = 1; n < a; n++) c[m = (m >> 2) + (d[f + 1] ? 4 : 0) + (d[f - h + 1] ? 8 : 0)] && (l[i + n] = c[m], ++g), f++;
                if (d[f - h] !== d[f] && (l[i + n] = d[f] ? 2 : 4, ++g), g > 1e3) return null
            }
            for (i = e * o, 0 !== d[f = h * (s - 1)] && (l[i] = 8, ++g), n = 1; n < a; n++) d[f] !== d[f + 1] && (l[i + n] = d[f] ? 4 : 8, ++g), f++;
            if (0 !== d[f] && (l[i + n] = 4, ++g), g > 1e3) return null;
            var v = new Int32Array([0, o, -1, 0, -o, 0, 0, 0, 1]),
                b = [];
            for (e = 0; g && e <= s; e++) {
                for (var S = e * o, x = S + a; S < x && !l[S];) S++;
                if (S !== x) {
                    var y, P = [S % o, e],
                        k = l[S],
                        C = S;
                    do {
                        var F = v[k];
                        do {
                            S += F
                        } while (!l[S]);
                        5 !== (y = l[S]) && 10 !== y ? (k = y, l[S] = 0) : (k = y & 51 * k >> 4, l[S] &= k >> 2 | k << 2), P.push(S % o), P.push(S / o | 0), --g
                    } while (C !== S);
                    b.push(P), --e
                }
            }
            return function (t) {
                t.save(), t.scale(1 / a, -1 / s), t.translate(0, -s), t.beginPath();
                for (var e = 0, n = b.length; e < n; e++) {
                    var i = b[e];
                    t.moveTo(i[0], i[1]);
                    for (var r = 2, o = i.length; r < o; r += 2) t.lineTo(i[r], i[r + 1])
                }
                t.fill(), t.beginPath(), t.restore()
            }
        }

        function x(t) {
            var e = tt[t[0]];
            return e || n("Unknown IR type: " + t[0]), e.fromIR(t)
        }
        var y = "undefined" == typeof window ? this : window,
            P = "undefined" == typeof window,
            k = [.001, 0, 0, .001, 0, 0],
            C = {
                FILL: 0,
                STROKE: 1,
                FILL_STROKE: 2,
                INVISIBLE: 3,
                FILL_ADD_TO_PATH: 4,
                STROKE_ADD_TO_PATH: 5,
                FILL_STROKE_ADD_TO_PATH: 6,
                ADD_TO_PATH: 7,
                FILL_STROKE_MASK: 3,
                ADD_TO_PATH_FLAG: 4
            },
            F = {
                GRAYSCALE_1BPP: 1,
                RGB_24BPP: 2,
                RGBA_32BPP: 3
            },
            D = {
                WIDGET: 1,
                TEXT: 2,
                LINK: 3
            };
        y.PDFJS || (y.PDFJS = {}), y.PDFJS.pdfBug = !1, PDFJS.VERBOSITY_LEVELS = {
            errors: 0,
            warnings: 1,
            infos: 5
        };
        var w = PDFJS.OPS = {
                dependency: 1,
                setLineWidth: 2,
                setLineCap: 3,
                setLineJoin: 4,
                setMiterLimit: 5,
                setDash: 6,
                setRenderingIntent: 7,
                setFlatness: 8,
                setGState: 9,
                save: 10,
                restore: 11,
                transform: 12,
                moveTo: 13,
                lineTo: 14,
                curveTo: 15,
                curveTo2: 16,
                curveTo3: 17,
                closePath: 18,
                rectangle: 19,
                stroke: 20,
                closeStroke: 21,
                fill: 22,
                eoFill: 23,
                fillStroke: 24,
                eoFillStroke: 25,
                closeFillStroke: 26,
                closeEOFillStroke: 27,
                endPath: 28,
                clip: 29,
                eoClip: 30,
                beginText: 31,
                endText: 32,
                setCharSpacing: 33,
                setWordSpacing: 34,
                setHScale: 35,
                setLeading: 36,
                setFont: 37,
                setTextRenderingMode: 38,
                setTextRise: 39,
                moveText: 40,
                setLeadingMoveText: 41,
                setTextMatrix: 42,
                nextLine: 43,
                showText: 44,
                showSpacedText: 45,
                nextLineShowText: 46,
                nextLineSetSpacingShowText: 47,
                setCharWidth: 48,
                setCharWidthAndBounds: 49,
                setStrokeColorSpace: 50,
                setFillColorSpace: 51,
                setStrokeColor: 52,
                setStrokeColorN: 53,
                setFillColor: 54,
                setFillColorN: 55,
                setStrokeGray: 56,
                setFillGray: 57,
                setStrokeRGBColor: 58,
                setFillRGBColor: 59,
                setStrokeCMYKColor: 60,
                setFillCMYKColor: 61,
                shadingFill: 62,
                beginInlineImage: 63,
                beginImageData: 64,
                endInlineImage: 65,
                paintXObject: 66,
                markPoint: 67,
                markPointProps: 68,
                beginMarkedContent: 69,
                beginMarkedContentProps: 70,
                endMarkedContent: 71,
                beginCompat: 72,
                endCompat: 73,
                paintFormXObjectBegin: 74,
                paintFormXObjectEnd: 75,
                beginGroup: 76,
                endGroup: 77,
                beginAnnotations: 78,
                endAnnotations: 79,
                beginAnnotation: 80,
                endAnnotation: 81,
                paintJpegXObject: 82,
                paintImageMaskXObject: 83,
                paintImageMaskXObjectGroup: 84,
                paintImageXObject: 85,
                paintInlineImageXObject: 86,
                paintInlineImageXObjectGroup: 87,
                paintImageXObjectRepeat: 88,
                paintImageMaskXObjectRepeat: 89,
                paintSolidColorImageMask: 90,
                constructPath: 91
            },
            T = PDFJS.UNSUPPORTED_FEATURES = {
                unknown: "unknown",
                forms: "forms",
                javaScript: "javaScript",
                smask: "smask",
                shadingPattern: "shadingPattern",
                font: "font"
            },
            L = PDFJS.UnsupportedManager = function () {
                var t = [];
                return {
                    listen: function (e) {
                        t.push(e)
                    },
                    notify: function (n) {
                        e('Unsupported feature "' + n + '"');
                        for (var i = 0, r = t.length; i < r; i++) t[i](n)
                    }
                }
            }();
        PDFJS.isValidUrl = function (t, e) {
            if (!t) return !1;
            var n = /^[a-z][a-z0-9+\-.]*(?=:)/i.exec(t);
            if (!n) return e;
            switch (n = n[0].toLowerCase()) {
                case "http":
                case "https":
                case "ftp":
                case "mailto":
                case "tel":
                    return !0;
                default:
                    return !1
            }
        }, PDFJS.shadow = s;
        var R = PDFJS.PasswordResponses = {
                NEED_PASSWORD: 1,
                INCORRECT_PASSWORD: 2
            },
            E = function () {
                function t(t, e) {
                    this.name = "PasswordException", this.message = t, this.code = e
                }
                return t.prototype = new Error, t.constructor = t, t
            }();
        PDFJS.PasswordException = E;
        var I = function () {
            function t(t, e) {
                this.name = "UnknownErrorException", this.message = t, this.details = e
            }
            return t.prototype = new Error, t.constructor = t, t
        }();
        PDFJS.UnknownErrorException = I;
        var M = function () {
            function t(t) {
                this.name = "InvalidPDFException", this.message = t
            }
            return t.prototype = new Error, t.constructor = t, t
        }();
        PDFJS.InvalidPDFException = M;
        var _ = function () {
            function t(t) {
                this.name = "MissingPDFException", this.message = t
            }
            return t.prototype = new Error, t.constructor = t, t
        }();
        PDFJS.MissingPDFException = _;
        var O = function () {
            function t(t, e) {
                this.name = "UnexpectedResponseException", this.message = t, this.status = e
            }
            return t.prototype = new Error, t.constructor = t, t
        }();
        PDFJS.UnexpectedResponseException = O;
        (function () {
            function t(t) {
                this.message = t
            }
            t.prototype = new Error, t.prototype.name = "NotImplementedException", t.constructor = t
        })(),
        function () {
            function t(t, e) {
                this.begin = t, this.end = e, this.message = "Missing data [" + t + ", " + e + ")"
            }
            t.prototype = new Error, t.prototype.name = "MissingDataException", t.constructor = t
        }(),
        function () {
            function t(t) {
                this.message = t
            }
            t.prototype = new Error, t.prototype.name = "XRefParseException", t.constructor = t
        }();
        Object.defineProperty(PDFJS, "isLittleEndian", {
            configurable: !0,
            get: function () {
                return s(PDFJS, "isLittleEndian", h())
            }
        }), Object.defineProperty(PDFJS, "hasCanvasTypedArrays", {
            configurable: !0,
            get: function () {
                return s(PDFJS, "hasCanvasTypedArrays", u())
            }
        });
        var N = function () {
                function t(t, e) {
                    this.buffer = t, this.byteLength = t.length, this.length = void 0 === e ? this.byteLength >> 2 : e, n(this.length)
                }

                function e(t) {
                    return {
                        get: function () {
                            var e = this.buffer,
                                n = t << 2;
                            return (e[n] | e[n + 1] << 8 | e[n + 2] << 16 | e[n + 3] << 24) >>> 0
                        },
                        set: function (e) {
                            var n = this.buffer,
                                i = t << 2;
                            n[i] = 255 & e, n[i + 1] = e >> 8 & 255, n[i + 2] = e >> 16 & 255, n[i + 3] = e >>> 24 & 255
                        }
                    }
                }

                function n(n) {
                    for (; i < n;) Object.defineProperty(t.prototype, i, e(i)), i++
                }
                t.prototype = Object.create(null);
                var i = 0;
                return t
            }(),
            j = [1, 0, 0, 1, 0, 0],
            J = PDFJS.Util = function () {
                function t() {}
                var e = ["rgb(", 0, ",", 0, ",", 0, ")"];
                return t.makeCssRgb = function (t, n, i) {
                    return e[1] = t, e[3] = n, e[5] = i, e.join("")
                }, t.transform = function (t, e) {
                    return [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]]
                }, t.applyTransform = function (t, e) {
                    return [t[0] * e[0] + t[1] * e[2] + e[4], t[0] * e[1] + t[1] * e[3] + e[5]]
                }, t.applyInverseTransform = function (t, e) {
                    var n = e[0] * e[3] - e[1] * e[2];
                    return [(t[0] * e[3] - t[1] * e[2] + e[2] * e[5] - e[4] * e[3]) / n, (-t[0] * e[1] + t[1] * e[0] + e[4] * e[1] - e[5] * e[0]) / n]
                }, t.getAxialAlignedBoundingBox = function (e, n) {
                    var i = t.applyTransform(e, n),
                        r = t.applyTransform(e.slice(2, 4), n),
                        a = t.applyTransform([e[0], e[3]], n),
                        s = t.applyTransform([e[2], e[1]], n);
                    return [Math.min(i[0], r[0], a[0], s[0]), Math.min(i[1], r[1], a[1], s[1]), Math.max(i[0], r[0], a[0], s[0]), Math.max(i[1], r[1], a[1], s[1])]
                }, t.inverseTransform = function (t) {
                    var e = t[0] * t[3] - t[1] * t[2];
                    return [t[3] / e, -t[1] / e, -t[2] / e, t[0] / e, (t[2] * t[5] - t[4] * t[3]) / e, (t[4] * t[1] - t[5] * t[0]) / e]
                }, t.apply3dTransform = function (t, e) {
                    return [t[0] * e[0] + t[1] * e[1] + t[2] * e[2], t[3] * e[0] + t[4] * e[1] + t[5] * e[2], t[6] * e[0] + t[7] * e[1] + t[8] * e[2]]
                }, t.singularValueDecompose2dScale = function (t) {
                    var e = [t[0], t[2], t[1], t[3]],
                        n = t[0] * e[0] + t[1] * e[2],
                        i = t[0] * e[1] + t[1] * e[3],
                        r = t[2] * e[0] + t[3] * e[2],
                        a = t[2] * e[1] + t[3] * e[3],
                        s = (n + a) / 2,
                        o = Math.sqrt((n + a) * (n + a) - 4 * (n * a - r * i)) / 2,
                        l = s + o || 1,
                        c = s - o || 1;
                    return [Math.sqrt(l), Math.sqrt(c)]
                }, t.normalizeRect = function (t) {
                    var e = t.slice(0);
                    return t[0] > t[2] && (e[0] = t[2], e[2] = t[0]), t[1] > t[3] && (e[1] = t[3], e[3] = t[1]), e
                }, t.intersect = function (e, n) {
                    function i(t, e) {
                        return t - e
                    }
                    var r = [e[0], e[2], n[0], n[2]].sort(i),
                        a = [e[1], e[3], n[1], n[3]].sort(i),
                        s = [];
                    return e = t.normalizeRect(e), n = t.normalizeRect(n), (r[0] === e[0] && r[1] === n[0] || r[0] === n[0] && r[1] === e[0]) && (s[0] = r[1], s[2] = r[2], (a[0] === e[1] && a[1] === n[1] || a[0] === n[1] && a[1] === e[1]) && (s[1] = a[1], s[3] = a[2], s))
                }, t.sign = function (t) {
                    return t < 0 ? -1 : 1
                }, t.appendToArray = function (t, e) {
                    Array.prototype.push.apply(t, e)
                }, t.prependToArray = function (t, e) {
                    Array.prototype.unshift.apply(t, e)
                }, t.extendObj = function (t, e) {
                    for (var n in e) t[n] = e[n]
                }, t.getInheritableProperty = function (t, e) {
                    for (; t && !t.has(e);) t = t.get("Parent");
                    return t ? t.get(e) : null
                }, t.inherit = function (t, e, n) {
                    t.prototype = Object.create(e.prototype), t.prototype.constructor = t;
                    for (var i in n) t.prototype[i] = n[i]
                }, t.loadScript = function (t, e) {
                    var n = document.createElement("script"),
                        i = !1;
                    n.setAttribute("src", t), e && (n.onload = function () {
                        i || e(), i = !0
                    }), document.getElementsByTagName("head")[0].appendChild(n)
                }, t
            }();
        PDFJS.PageViewport = function () {
            function t(t, e, n, i, r, a) {
                this.viewBox = t, this.scale = e, this.rotation = n, this.offsetX = i, this.offsetY = r;
                var s, o, l, c, h = (t[2] + t[0]) / 2,
                    u = (t[3] + t[1]) / 2;
                switch (n %= 360, n = n < 0 ? n + 360 : n) {
                    case 180:
                        s = -1, o = 0, l = 0, c = 1;
                        break;
                    case 90:
                        s = 0, o = 1, l = 1, c = 0;
                        break;
                    case 270:
                        s = 0, o = -1, l = -1, c = 0;
                        break;
                    default:
                        s = 1, o = 0, l = 0, c = -1
                }
                a && (l = -l, c = -c);
                var d, f, p, A;
                0 === s ? (d = Math.abs(u - t[1]) * e + i, f = Math.abs(h - t[0]) * e + r, p = Math.abs(t[3] - t[1]) * e, A = Math.abs(t[2] - t[0]) * e) : (d = Math.abs(h - t[0]) * e + i, f = Math.abs(u - t[1]) * e + r, p = Math.abs(t[2] - t[0]) * e, A = Math.abs(t[3] - t[1]) * e), this.transform = [s * e, o * e, l * e, c * e, d - s * e * h - l * e * u, f - o * e * h - c * e * u], this.width = p, this.height = A, this.fontScale = e
            }
            return t.prototype = {
                clone: function (e) {
                    var n = "scale" in (e = e || {}) ? e.scale : this.scale,
                        i = "rotation" in e ? e.rotation : this.rotation;
                    return new t(this.viewBox.slice(), n, i, this.offsetX, this.offsetY, e.dontFlip)
                },
                convertToViewportPoint: function (t, e) {
                    return J.applyTransform([t, e], this.transform)
                },
                convertToViewportRectangle: function (t) {
                    var e = J.applyTransform([t[0], t[1]], this.transform),
                        n = J.applyTransform([t[2], t[3]], this.transform);
                    return [e[0], e[1], n[0], n[1]]
                },
                convertToPdfPoint: function (t, e) {
                    return J.applyInverseTransform([t, e], this.transform)
                }
            }, t
        }();
        PDFJS.createPromiseCapability = A,
            function () {
                function t(t) {
                    this._status = n, this._handlers = [];
                    try {
                        t.call(this, this._resolve.bind(this), this._reject.bind(this))
                    } catch (t) {
                        this._reject(t)
                    }
                }
                if (y.Promise) return "function" != typeof y.Promise.all && (y.Promise.all = function (t) {
                    var e, n, i = 0,
                        r = [],
                        a = new y.Promise(function (t, i) {
                            e = t, n = i
                        });
                    return t.forEach(function (t, a) {
                        i++, t.then(function (t) {
                            r[a] = t, 0 === --i && e(r)
                        }, n)
                    }), 0 === i && e(r), a
                }), "function" != typeof y.Promise.resolve && (y.Promise.resolve = function (t) {
                    return new y.Promise(function (e) {
                        e(t)
                    })
                }), "function" != typeof y.Promise.reject && (y.Promise.reject = function (t) {
                    return new y.Promise(function (e, n) {
                        n(t)
                    })
                }), void("function" != typeof y.Promise.prototype.catch && (y.Promise.prototype.catch = function (t) {
                    return y.Promise.prototype.then(void 0, t)
                }));
                var n = 0,
                    i = 2,
                    r = {
                        handlers: [],
                        running: !1,
                        unhandledRejections: [],
                        pendingRejectionCheck: !1,
                        scheduleHandlers: function (t) {
                            t._status !== n && (this.handlers = this.handlers.concat(t._handlers), t._handlers = [], this.running || (this.running = !0, setTimeout(this.runHandlers.bind(this), 0)))
                        },
                        runHandlers: function () {
                            for (var t = Date.now() + 1; this.handlers.length > 0;) {
                                var e = this.handlers.shift(),
                                    n = e.thisPromise._status,
                                    r = e.thisPromise._value;
                                try {
                                    1 === n ? "function" == typeof e.onResolve && (r = e.onResolve(r)) : "function" == typeof e.onReject && (r = e.onReject(r), n = 1, e.thisPromise._unhandledRejection && this.removeUnhandeledRejection(e.thisPromise))
                                } catch (t) {
                                    n = i, r = t
                                }
                                if (e.nextPromise._updateStatus(n, r), Date.now() >= t) break
                            }
                            this.handlers.length > 0 ? setTimeout(this.runHandlers.bind(this), 0) : this.running = !1
                        },
                        addUnhandledRejection: function (t) {
                            this.unhandledRejections.push({
                                promise: t,
                                time: Date.now()
                            }), this.scheduleRejectionCheck()
                        },
                        removeUnhandeledRejection: function (t) {
                            t._unhandledRejection = !1;
                            for (var e = 0; e < this.unhandledRejections.length; e++) this.unhandledRejections[e].promise === t && (this.unhandledRejections.splice(e), e--)
                        },
                        scheduleRejectionCheck: function () {
                            this.pendingRejectionCheck || (this.pendingRejectionCheck = !0, setTimeout(function () {
                                this.pendingRejectionCheck = !1;
                                for (var t = Date.now(), n = 0; n < this.unhandledRejections.length; n++)
                                    if (t - this.unhandledRejections[n].time > 500) {
                                        var i = this.unhandledRejections[n].promise._value,
                                            r = "Unhandled rejection: " + i;
                                        i.stack && (r += "\n" + i.stack), e(r), this.unhandledRejections.splice(n), n--
                                    } this.unhandledRejections.length && this.scheduleRejectionCheck()
                            }.bind(this), 500))
                        }
                    };
                t.all = function (e) {
                    var n, r, a = new t(function (t, e) {
                            n = t, r = e
                        }),
                        s = e.length,
                        o = [];
                    if (0 === s) return n(o), a;
                    for (var l = 0, c = e.length; l < c; ++l) {
                        var h = e[l],
                            u = function (t) {
                                return function (e) {
                                    a._status !== i && (o[t] = e, 0 === --s && n(o))
                                }
                            }(l);
                        t.isPromise(h) ? h.then(u, function (t) {
                            a._status !== i && (o = [], r(t))
                        }) : u(h)
                    }
                    return a
                }, t.isPromise = function (t) {
                    return t && "function" == typeof t.then
                }, t.resolve = function (e) {
                    return new t(function (t) {
                        t(e)
                    })
                }, t.reject = function (e) {
                    return new t(function (t, n) {
                        n(e)
                    })
                }, t.prototype = {
                    _status: null,
                    _value: null,
                    _handlers: null,
                    _unhandledRejection: null,
                    _updateStatus: function (e, n) {
                        1 !== this._status && this._status !== i && (1 === e && t.isPromise(n) ? n.then(this._updateStatus.bind(this, 1), this._updateStatus.bind(this, i)) : (this._status = e, this._value = n, e === i && 0 === this._handlers.length && (this._unhandledRejection = !0, r.addUnhandledRejection(this)), r.scheduleHandlers(this)))
                    },
                    _resolve: function (t) {
                        this._updateStatus(1, t)
                    },
                    _reject: function (t) {
                        this._updateStatus(i, t)
                    },
                    then: function (e, n) {
                        var i = new t(function (t, e) {
                            this.resolve = t, this.reject = e
                        });
                        return this._handlers.push({
                            thisPromise: this,
                            onResolve: e,
                            onReject: n,
                            nextPromise: i
                        }), r.scheduleHandlers(this), i
                    },
                    catch: function (t) {
                        return this.then(void 0, t)
                    }
                }, y.Promise = t
            }();
        var B = function () {
            function t(t, e, n) {
                for (; t.length < n;) t += e;
                return t
            }

            function n() {
                this.started = {}, this.times = [], this.enabled = !0
            }
            return n.prototype = {
                time: function (t) {
                    this.enabled && (t in this.started && e("Timer is already running for " + t), this.started[t] = Date.now())
                },
                timeEnd: function (t) {
                    this.enabled && (t in this.started || e("Timer has not been started for " + t), this.times.push({
                        name: t,
                        start: this.started[t],
                        end: Date.now()
                    }), delete this.started[t])
                },
                toString: function () {
                    var e, n, i = this.times,
                        r = "",
                        a = 0;
                    for (e = 0, n = i.length; e < n; ++e) {
                        var s = i[e].name;
                        s.length > a && (a = s.length)
                    }
                    for (e = 0, n = i.length; e < n; ++e) {
                        var o = i[e],
                            l = o.end - o.start;
                        r += t(o.name, " ", a) + " " + l + "ms\n"
                    }
                    return r
                }
            }, n
        }();
        PDFJS.createBlob = function (t, e) {
            if ("undefined" != typeof Blob) return new Blob([t], {
                type: e
            });
            var n = new MozBlobBuilder;
            return n.append(t), n.getBlob(e)
        }, PDFJS.createObjectURL = function () {
            var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            return function (e, n) {
                if (!PDFJS.disableCreateObjectURL && "undefined" != typeof URL && URL.createObjectURL) {
                    var i = PDFJS.createBlob(e, n);
                    return URL.createObjectURL(i)
                }
                for (var r = "data:" + n + ";base64,", a = 0, s = e.length; a < s; a += 3) {
                    var o = 255 & e[a],
                        l = 255 & e[a + 1],
                        c = 255 & e[a + 2],
                        h = o >> 2,
                        u = (3 & o) << 4 | l >> 4,
                        d = a + 1 < s ? (15 & l) << 2 | c >> 6 : 64,
                        f = a + 2 < s ? 63 & c : 64;
                    r += t[h] + t[u] + t[d] + t[f]
                }
                return r
            }
        }(), g.prototype = {
            on: function (t, e, i) {
                var r = this.actionHandler;
                r[t] && n('There is already an actionName called "' + t + '"'), r[t] = [e, i]
            },
            send: function (t, e, n) {
                var i = {
                    action: t,
                    data: e
                };
                this.postMessage(i, n)
            },
            sendWithPromise: function (t, e, n) {
                var i = this.callbackIndex++,
                    r = {
                        action: t,
                        data: e,
                        callbackId: i
                    },
                    a = A();
                this.callbacksCapabilities[i] = a;
                try {
                    this.postMessage(r, n)
                } catch (t) {
                    a.reject(t)
                }
                return a.promise
            },
            postMessage: function (t, e) {
                e && this.postMessageTransfers ? this.comObj.postMessage(t, e) : this.comObj.postMessage(t)
            }
        }, PDFJS.maxImageSize = void 0 === PDFJS.maxImageSize ? -1 : PDFJS.maxImageSize, PDFJS.cMapUrl = void 0 === PDFJS.cMapUrl ? null : PDFJS.cMapUrl, PDFJS.cMapPacked = void 0 !== PDFJS.cMapPacked && PDFJS.cMapPacked, PDFJS.disableFontFace = void 0 !== PDFJS.disableFontFace && PDFJS.disableFontFace, PDFJS.imageResourcesPath = void 0 === PDFJS.imageResourcesPath ? "" : PDFJS.imageResourcesPath, PDFJS.disableWorker = void 0 !== PDFJS.disableWorker && PDFJS.disableWorker, PDFJS.workerSrc = void 0 === PDFJS.workerSrc ? null : PDFJS.workerSrc, PDFJS.disableRange = void 0 !== PDFJS.disableRange && PDFJS.disableRange, PDFJS.disableStream = void 0 !== PDFJS.disableStream && PDFJS.disableStream, PDFJS.disableAutoFetch = void 0 !== PDFJS.disableAutoFetch && PDFJS.disableAutoFetch, PDFJS.pdfBug = void 0 !== PDFJS.pdfBug && PDFJS.pdfBug, PDFJS.postMessageTransfers = void 0 === PDFJS.postMessageTransfers || PDFJS.postMessageTransfers, PDFJS.disableCreateObjectURL = void 0 !== PDFJS.disableCreateObjectURL && PDFJS.disableCreateObjectURL, PDFJS.disableWebGL = void 0 === PDFJS.disableWebGL || PDFJS.disableWebGL, PDFJS.disableFullscreen = void 0 !== PDFJS.disableFullscreen && PDFJS.disableFullscreen, PDFJS.useOnlyCssZoom = void 0 !== PDFJS.useOnlyCssZoom && PDFJS.useOnlyCssZoom, PDFJS.verbosity = void 0 === PDFJS.verbosity ? PDFJS.VERBOSITY_LEVELS.warnings : PDFJS.verbosity, PDFJS.maxCanvasPixels = void 0 === PDFJS.maxCanvasPixels ? 16777216 : PDFJS.maxCanvasPixels, PDFJS.openExternalLinksInNewWindow = void 0 !== PDFJS.openExternalLinksInNewWindow && PDFJS.openExternalLinksInNewWindow, PDFJS.getDocument = function (t, e, i, r) {
            var s = new W;
            e && (e instanceof G || ((e = Object.create(e)).length = t.length, e.initialData = t.initialData), (t = Object.create(t)).range = e), s.onPassword = i || null, s.onProgress = r || null;
            var o, c, h;
            "string" == typeof t ? h = {
                url: t,
                withCredentials: !0
            } : p(t) ? h = {
                data: t,
                withCredentials: !0
            } : t instanceof G ? h = {
                range: t,
                withCredentials: !0
            } : ("object" != typeof t && n("Invalid parameter in getDocument, need either Uint8Array, string or a parameter object"), t.url || t.data || t.range || n("Invalid parameter object: need either .data, .range or .url"), h = t);
            var u = {};
            for (var d in h)
                if ("url" !== d || "undefined" == typeof window) {
                    if ("range" !== d)
                        if ("data" !== d || h[d] instanceof Uint8Array) u[d] = h[d];
                        else {
                            var f = h[d];
                            "string" == typeof f ? u[d] = l(f) : "object" != typeof f || null === f || isNaN(f.length) ? n("Invalid PDF binary data: either typed array, string or array-like object is expected in the data property.") : u[d] = new Uint8Array(f)
                        }
                } else u[d] = a(window.location.href, h[d]);
            return o = A(), c = new z(o, h.range), o.promise.then(function () {
                c.fetchDocument(s, u)
            }), s
        };
        var W = function () {
                function t() {
                    this._capability = A(), this.onPassword = null, this.onProgress = null
                }
                return t.prototype = {
                    get promise() {
                        return this._capability.promise
                    },
                    then: function (t, e) {
                        return this.promise.then.apply(this.promise, arguments)
                    }
                }, t
            }(),
            G = function () {
                function t(t, e) {
                    this.length = t, this.initialData = e, this._rangeListeners = [], this._progressListeners = [], this._progressiveReadListeners = [], this._readyCapability = A()
                }
                return t.prototype = {
                    addRangeListener: function (t) {
                        this._rangeListeners.push(t)
                    },
                    addProgressListener: function (t) {
                        this._progressListeners.push(t)
                    },
                    addProgressiveReadListener: function (t) {
                        this._progressiveReadListeners.push(t)
                    },
                    onDataRange: function (t, e) {
                        for (var n = this._rangeListeners, i = 0, r = n.length; i < r; ++i) n[i](t, e)
                    },
                    onDataProgress: function (t) {
                        this._readyCapability.promise.then(function () {
                            for (var e = this._progressListeners, n = 0, i = e.length; n < i; ++n) e[n](t)
                        }.bind(this))
                    },
                    onDataProgressiveRead: function (t) {
                        this._readyCapability.promise.then(function () {
                            for (var e = this._progressiveReadListeners, n = 0, i = e.length; n < i; ++n) e[n](t)
                        }.bind(this))
                    },
                    transportReady: function () {
                        this._readyCapability.resolve()
                    },
                    requestDataRange: function (t, e) {
                        throw new Error("Abstract method PDFDataRangeTransport.requestDataRange")
                    }
                }, t
            }();
        PDFJS.PDFDataRangeTransport = G;
        var U = function () {
                function t(t, e) {
                    this.pdfInfo = t, this.transport = e
                }
                return t.prototype = {
                    get numPages() {
                        return this.pdfInfo.numPages
                    },
                    get fingerprint() {
                        return this.pdfInfo.fingerprint
                    },
                    getPage: function (t) {
                        return this.transport.getPage(t)
                    },
                    getPageIndex: function (t) {
                        return this.transport.getPageIndex(t)
                    },
                    getDestinations: function () {
                        return this.transport.getDestinations()
                    },
                    getDestination: function (t) {
                        return this.transport.getDestination(t)
                    },
                    getAttachments: function () {
                        return this.transport.getAttachments()
                    },
                    getJavaScript: function () {
                        return this.transport.getJavaScript()
                    },
                    getOutline: function () {
                        return this.transport.getOutline()
                    },
                    getMetadata: function () {
                        return this.transport.getMetadata()
                    },
                    getData: function () {
                        return this.transport.getData()
                    },
                    getDownloadInfo: function () {
                        return this.transport.downloadInfoCapability.promise
                    },
                    getStats: function () {
                        return this.transport.getStats()
                    },
                    cleanup: function () {
                        this.transport.startCleanup()
                    },
                    destroy: function () {
                        this.transport.destroy()
                    }
                }, t
            }(),
            X = function () {
                function t(t, e, n) {
                    this.pageIndex = t, this.pageInfo = e, this.transport = n, this.stats = new B, this.stats.enabled = !!y.PDFJS.enableStats, this.commonObjs = n.commonObjs, this.objs = new Y, this.cleanupAfterRender = !1, this.pendingDestroy = !1, this.intentStates = {}
                }
                return t.prototype = {
                    get pageNumber() {
                        return this.pageIndex + 1
                    },
                    get rotate() {
                        return this.pageInfo.rotate
                    },
                    get ref() {
                        return this.pageInfo.ref
                    },
                    get view() {
                        return this.pageInfo.view
                    },
                    getViewport: function (t, e) {
                        return arguments.length < 2 && (e = this.rotate), new PDFJS.PageViewport(this.view, t, e, 0, 0)
                    },
                    getAnnotations: function () {
                        if (this.annotationsPromise) return this.annotationsPromise;
                        var t = this.transport.getAnnotations(this.pageIndex);
                        return this.annotationsPromise = t, t
                    },
                    render: function (t) {
                        function e(t) {
                            var e = r.renderTasks.indexOf(a);
                            e >= 0 && r.renderTasks.splice(e, 1), o.cleanupAfterRender && (o.pendingDestroy = !0), o._tryDestroy(), t ? a.capability.reject(t) : a.capability.resolve(), n.timeEnd("Rendering"), n.timeEnd("Overall")
                        }
                        var n = this.stats;
                        n.time("Overall"), this.pendingDestroy = !1;
                        var i = "print" === t.intent ? "print" : "display";
                        this.intentStates[i] || (this.intentStates[i] = {});
                        var r = this.intentStates[i];
                        r.displayReadyCapability || (r.receivingOperatorList = !0, r.displayReadyCapability = A(), r.operatorList = {
                            fnArray: [],
                            argsArray: [],
                            lastChunk: !1
                        }, this.stats.time("Page Request"), this.transport.messageHandler.send("RenderPageRequest", {
                            pageIndex: this.pageNumber - 1,
                            intent: i
                        }));
                        var a = new Q(e, t, this.objs, this.commonObjs, r.operatorList, this.pageNumber);
                        a.useRequestAnimationFrame = "print" !== i, r.renderTasks || (r.renderTasks = []), r.renderTasks.push(a);
                        var s = a.task;
                        t.continueCallback && (s.onContinue = t.continueCallback);
                        var o = this;
                        return r.displayReadyCapability.promise.then(function (t) {
                            o.pendingDestroy ? e() : (n.time("Rendering"), a.initalizeGraphics(t), a.operatorListChanged())
                        }, function (t) {
                            e(t)
                        }), s
                    },
                    getOperatorList: function () {
                        this.intentStates.oplist || (this.intentStates.oplist = {});
                        var t = this.intentStates.oplist;
                        if (!t.opListReadCapability) {
                            var e = {};
                            e.operatorListChanged = function () {
                                t.operatorList.lastChunk && t.opListReadCapability.resolve(t.operatorList)
                            }, t.receivingOperatorList = !0, t.opListReadCapability = A(), t.renderTasks = [], t.renderTasks.push(e), t.operatorList = {
                                fnArray: [],
                                argsArray: [],
                                lastChunk: !1
                            }, this.transport.messageHandler.send("RenderPageRequest", {
                                pageIndex: this.pageIndex,
                                intent: "oplist"
                            })
                        }
                        return t.opListReadCapability.promise
                    },
                    getTextContent: function () {
                        return this.transport.messageHandler.sendWithPromise("GetTextContent", {
                            pageIndex: this.pageNumber - 1
                        })
                    },
                    destroy: function () {
                        this.pendingDestroy = !0, this._tryDestroy()
                    },
                    _tryDestroy: function () {
                        this.pendingDestroy && !Object.keys(this.intentStates).some(function (t) {
                            var e = this.intentStates[t];
                            return 0 !== e.renderTasks.length || e.receivingOperatorList
                        }, this) && (Object.keys(this.intentStates).forEach(function (t) {
                            delete this.intentStates[t]
                        }, this), this.objs.clear(), this.annotationsPromise = null, this.pendingDestroy = !1)
                    },
                    _startRenderPage: function (t, e) {
                        var n = this.intentStates[e];
                        n.displayReadyCapability && n.displayReadyCapability.resolve(t)
                    },
                    _renderPageChunk: function (t, e) {
                        var n, i, r = this.intentStates[e];
                        for (n = 0, i = t.length; n < i; n++) r.operatorList.fnArray.push(t.fnArray[n]), r.operatorList.argsArray.push(t.argsArray[n]);
                        for (r.operatorList.lastChunk = t.lastChunk, n = 0; n < r.renderTasks.length; n++) r.renderTasks[n].operatorListChanged();
                        t.lastChunk && (r.receivingOperatorList = !1, this._tryDestroy())
                    }
                }, t
            }(),
            z = function () {
                function i(e, i) {
                    if (this.pdfDataRangeTransport = i, this.workerInitializedCapability = e, this.commonObjs = new Y, this.loadingTask = null, this.pageCache = [], this.pagePromises = [], this.downloadInfoCapability = A(), !y.PDFJS.disableWorker && "undefined" != typeof Worker) {
                        var r = PDFJS.workerSrc;
                        r || n("No PDFJS.workerSrc specified");
                        try {
                            var a = new Worker(r),
                                s = new g("main", a);
                            this.messageHandler = s, s.on("test", function (t) {
                                t && t.supportTypedArray ? (this.worker = a, t.supportTransfers || (PDFJS.postMessageTransfers = !1), this.setupMessageHandler(s), e.resolve()) : this.setupFakeWorker()
                            }.bind(this));
                            var o = new Uint8Array([PDFJS.postMessageTransfers ? 255 : 0]);
                            try {
                                s.send("test", o, [o.buffer])
                            } catch (e) {
                                t("Cannot use postMessage transfers"), o[0] = 0, s.send("test", o)
                            }
                            return
                        } catch (e) {
                            t("The worker has been disabled.")
                        }
                    }
                    this.setupFakeWorker()
                }
                return i.prototype = {
                    destroy: function () {
                        this.pageCache = [], this.pagePromises = [];
                        var t = this;
                        this.messageHandler.sendWithPromise("Terminate", null).then(function () {
                            it.clear(), t.worker && t.worker.terminate()
                        })
                    },
                    setupFakeWorker: function () {
                        y.PDFJS.disableWorker = !0, PDFJS.fakeWorkerFilesLoadedCapability || (PDFJS.fakeWorkerFilesLoadedCapability = A(), J.loadScript(PDFJS.workerSrc, function () {
                            PDFJS.fakeWorkerFilesLoadedCapability.resolve()
                        })), PDFJS.fakeWorkerFilesLoadedCapability.promise.then(function () {
                            e("Setting up fake worker.");
                            var t = {
                                    postMessage: function (e) {
                                        t.onmessage({
                                            data: e
                                        })
                                    },
                                    terminate: function () {}
                                },
                                n = new g("main", t);
                            this.setupMessageHandler(n), PDFJS.WorkerMessageHandler.setup(n), this.workerInitializedCapability.resolve()
                        }.bind(this))
                    },
                    setupMessageHandler: function (t) {
                        function i(e) {
                            t.send("UpdatePassword", e)
                        }
                        this.messageHandler = t;
                        var r = this.pdfDataRangeTransport;
                        r && (r.addRangeListener(function (e, n) {
                            t.send("OnDataRange", {
                                begin: e,
                                chunk: n
                            })
                        }), r.addProgressListener(function (e) {
                            t.send("OnDataProgress", {
                                loaded: e
                            })
                        }), r.addProgressiveReadListener(function (e) {
                            t.send("OnDataRange", {
                                chunk: e
                            })
                        }), t.on("RequestDataRange", function (t) {
                            r.requestDataRange(t.begin, t.end)
                        }, this)), t.on("GetDoc", function (t) {
                            var e = t.pdfInfo;
                            this.numPages = t.pdfInfo.numPages;
                            var n = new U(e, this);
                            this.pdfDocument = n, this.loadingTask._capability.resolve(n)
                        }, this), t.on("NeedPassword", function (t) {
                            var e = this.loadingTask;
                            if (e.onPassword) return e.onPassword(i, R.NEED_PASSWORD);
                            e._capability.reject(new E(t.message, t.code))
                        }, this), t.on("IncorrectPassword", function (t) {
                            var e = this.loadingTask;
                            if (e.onPassword) return e.onPassword(i, R.INCORRECT_PASSWORD);
                            e._capability.reject(new E(t.message, t.code))
                        }, this), t.on("InvalidPDF", function (t) {
                            this.loadingTask._capability.reject(new M(t.message))
                        }, this), t.on("MissingPDF", function (t) {
                            this.loadingTask._capability.reject(new _(t.message))
                        }, this), t.on("UnexpectedResponse", function (t) {
                            this.loadingTask._capability.reject(new O(t.message, t.status))
                        }, this), t.on("UnknownError", function (t) {
                            this.loadingTask._capability.reject(new I(t.message, t.details))
                        }, this), t.on("DataLoaded", function (t) {
                            this.downloadInfoCapability.resolve(t)
                        }, this), t.on("PDFManagerReady", function (t) {
                            this.pdfDataRangeTransport && this.pdfDataRangeTransport.transportReady()
                        }, this), t.on("StartRenderPage", function (t) {
                            var e = this.pageCache[t.pageIndex];
                            e.stats.timeEnd("Page Request"), e._startRenderPage(t.transparency, t.intent)
                        }, this), t.on("RenderPageChunk", function (t) {
                            this.pageCache[t.pageIndex]._renderPageChunk(t.operatorList, t.intent)
                        }, this), t.on("commonobj", function (t) {
                            var n = t[0],
                                i = t[1];
                            if (!this.commonObjs.hasData(n)) switch (i) {
                                case "Font":
                                    var r, a = t[2];
                                    if ("error" in a) {
                                        var s = a.error;
                                        e("Error during font loading: " + s), this.commonObjs.resolve(n, s);
                                        break
                                    }
                                    r = new rt(a), it.bind([r], function (t) {
                                        this.commonObjs.resolve(n, r)
                                    }.bind(this));
                                    break;
                                case "FontPath":
                                    this.commonObjs.resolve(n, t[2]);
                                    break;
                                default:
                                    s("Got unknown common object type " + i)
                            }
                        }, this), t.on("obj", function (t) {
                            var e, i = t[0],
                                r = t[1],
                                a = t[2],
                                s = this.pageCache[r];
                            if (!s.objs.hasData(i)) switch (a) {
                                case "JpegStream":
                                    m(i, e = t[3], s.objs);
                                    break;
                                case "Image":
                                    e = t[3], s.objs.resolve(i, e);
                                    e && "data" in e && e.data.length > 8e6 && (s.cleanupAfterRender = !0);
                                    break;
                                default:
                                    n("Got unknown object type " + a)
                            }
                        }, this), t.on("DocProgress", function (t) {
                            var e = this.loadingTask;
                            e.onProgress && e.onProgress({
                                loaded: t.loaded,
                                total: t.total
                            })
                        }, this), t.on("PageError", function (t) {
                            var e = this.pageCache[t.pageNum - 1].intentStates[t.intent];
                            e.displayReadyCapability ? e.displayReadyCapability.reject(t.error) : n(t.error)
                        }, this), t.on("JpegDecode", function (t) {
                            var e = t[0],
                                n = t[1];
                            return 3 !== n && 1 !== n ? Promise.reject(new Error("Only 3 components or 1 component can be returned")) : new Promise(function (t, i) {
                                var r = new Image;
                                r.onload = function () {
                                    var e = r.width,
                                        i = r.height,
                                        a = e * i,
                                        s = 4 * a,
                                        o = new Uint8Array(a * n),
                                        l = v(e, i).getContext("2d");
                                    l.drawImage(r, 0, 0);
                                    var c, h, u = l.getImageData(0, 0, e, i).data;
                                    if (3 === n)
                                        for (c = 0, h = 0; c < s; c += 4, h += 3) o[h] = u[c], o[h + 1] = u[c + 1], o[h + 2] = u[c + 2];
                                    else if (1 === n)
                                        for (c = 0, h = 0; c < s; c += 4, h++) o[h] = u[c];
                                    t({
                                        data: o,
                                        width: e,
                                        height: i
                                    })
                                }, r.onerror = function () {
                                    i(new Error("JpegDecode failed to load image"))
                                }, r.src = e
                            })
                        })
                    },
                    fetchDocument: function (t, e) {
                        this.loadingTask = t, e.disableAutoFetch = PDFJS.disableAutoFetch, e.disableStream = PDFJS.disableStream, e.chunkedViewerLoading = !!this.pdfDataRangeTransport, this.pdfDataRangeTransport && (e.length = this.pdfDataRangeTransport.length, e.initialData = this.pdfDataRangeTransport.initialData), this.messageHandler.send("GetDocRequest", {
                            source: e,
                            disableRange: PDFJS.disableRange,
                            maxImageSize: PDFJS.maxImageSize,
                            cMapUrl: PDFJS.cMapUrl,
                            cMapPacked: PDFJS.cMapPacked,
                            disableFontFace: PDFJS.disableFontFace,
                            disableCreateObjectURL: PDFJS.disableCreateObjectURL,
                            verbosity: PDFJS.verbosity
                        })
                    },
                    getData: function () {
                        return this.messageHandler.sendWithPromise("GetData", null)
                    },
                    getPage: function (t, e) {
                        if (t <= 0 || t > this.numPages || (0 | t) !== t) return Promise.reject(new Error("Invalid page request"));
                        var n = t - 1;
                        if (n in this.pagePromises) return this.pagePromises[n];
                        var i = this.messageHandler.sendWithPromise("GetPage", {
                            pageIndex: n
                        }).then(function (t) {
                            var e = new X(n, t, this);
                            return this.pageCache[n] = e, e
                        }.bind(this));
                        return this.pagePromises[n] = i, i
                    },
                    getPageIndex: function (t) {
                        return this.messageHandler.sendWithPromise("GetPageIndex", {
                            ref: t
                        })
                    },
                    getAnnotations: function (t) {
                        return this.messageHandler.sendWithPromise("GetAnnotations", {
                            pageIndex: t
                        })
                    },
                    getDestinations: function () {
                        return this.messageHandler.sendWithPromise("GetDestinations", null)
                    },
                    getDestination: function (t) {
                        return this.messageHandler.sendWithPromise("GetDestination", {
                            id: t
                        })
                    },
                    getAttachments: function () {
                        return this.messageHandler.sendWithPromise("GetAttachments", null)
                    },
                    getJavaScript: function () {
                        return this.messageHandler.sendWithPromise("GetJavaScript", null)
                    },
                    getOutline: function () {
                        return this.messageHandler.sendWithPromise("GetOutline", null)
                    },
                    getMetadata: function () {
                        return this.messageHandler.sendWithPromise("GetMetadata", null).then(function (t) {
                            return {
                                info: t[0],
                                metadata: t[1] ? new PDFJS.Metadata(t[1]) : null
                            }
                        })
                    },
                    getStats: function () {
                        return this.messageHandler.sendWithPromise("GetStats", null)
                    },
                    startCleanup: function () {
                        this.messageHandler.sendWithPromise("Cleanup", null).then(function () {
                            for (var t = 0, e = this.pageCache.length; t < e; t++) {
                                var n = this.pageCache[t];
                                n && n.destroy()
                            }
                            this.commonObjs.clear(), it.clear()
                        }.bind(this))
                    }
                }, i
            }(),
            Y = function () {
                function t() {
                    this.objs = {}
                }
                return t.prototype = {
                    ensureObj: function (t) {
                        if (this.objs[t]) return this.objs[t];
                        var e = {
                            capability: A(),
                            data: null,
                            resolved: !1
                        };
                        return this.objs[t] = e, e
                    },
                    get: function (t, e) {
                        if (e) return this.ensureObj(t).capability.promise.then(e), null;
                        var i = this.objs[t];
                        return i && i.resolved || n("Requesting object that isn't resolved yet " + t), i.data
                    },
                    resolve: function (t, e) {
                        var n = this.ensureObj(t);
                        n.resolved = !0, n.data = e, n.capability.resolve(e)
                    },
                    isResolved: function (t) {
                        var e = this.objs;
                        return !!e[t] && e[t].resolved
                    },
                    hasData: function (t) {
                        return this.isResolved(t)
                    },
                    getData: function (t) {
                        var e = this.objs;
                        return e[t] && e[t].resolved ? e[t].data : null
                    },
                    clear: function () {
                        this.objs = {}
                    }
                }, t
            }(),
            H = function () {
                function t(t) {
                    this._internalRenderTask = t, this.onContinue = null
                }
                return t.prototype = {
                    get promise() {
                        return this._internalRenderTask.capability.promise
                    },
                    cancel: function () {
                        this._internalRenderTask.cancel()
                    },
                    then: function (t, e) {
                        return this.promise.then.apply(this.promise, arguments)
                    }
                }, t
            }(),
            Q = function () {
                function t(t, e, n, i, r, a) {
                    this.callback = t, this.params = e, this.objs = n, this.commonObjs = i, this.operatorListIdx = null, this.operatorList = r, this.pageNumber = a, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this.useRequestAnimationFrame = !1, this.cancelled = !1, this.capability = A(), this.task = new H(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this)
                }
                return t.prototype = {
                    initalizeGraphics: function (t) {
                        if (!this.cancelled) {
                            PDFJS.pdfBug && "StepperManager" in y && y.StepperManager.enabled && (this.stepper = y.StepperManager.create(this.pageNumber - 1), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
                            var e = this.params;
                            this.gfx = new Z(e.canvasContext, this.commonObjs, this.objs, e.imageLayer), this.gfx.beginDrawing(e.viewport, t), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback && this.graphicsReadyCallback()
                        }
                    },
                    cancel: function () {
                        this.running = !1, this.cancelled = !0, this.callback("cancelled")
                    },
                    operatorListChanged: function () {
                        this.graphicsReady ? (this.stepper && this.stepper.updateOperatorList(this.operatorList), this.running || this._continue()) : this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound)
                    },
                    _continue: function () {
                        this.running = !0, this.cancelled || (this.task.onContinue ? this.task.onContinue.call(this.task, this._scheduleNextBound) : this._scheduleNext())
                    },
                    _scheduleNext: function () {
                        this.useRequestAnimationFrame ? window.requestAnimationFrame(this._nextBound) : Promise.resolve(void 0).then(this._nextBound)
                    },
                    _next: function () {
                        this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), this.callback())))
                    }
                }, t
            }(),
            V = (PDFJS.Metadata = function () {
                function t(t) {
                    return t.replace(/>\\376\\377([^<]+)/g, function (t, e) {
                        for (var n = e.replace(/\\([0-3])([0-7])([0-7])/g, function (t, e, n, i) {
                                return String.fromCharCode(64 * e + 8 * n + 1 * i)
                            }), i = "", r = 0; r < n.length; r += 2) {
                            var a = 256 * n.charCodeAt(r) + n.charCodeAt(r + 1);
                            i += "&#x" + (65536 + a).toString(16).substring(1) + ";"
                        }
                        return ">" + i
                    })
                }

                function e(e) {
                    "string" == typeof e ? (e = t(e), e = (new DOMParser).parseFromString(e, "application/xml")) : e instanceof Document || n("Metadata: Invalid metadata object"), this.metaDocument = e, this.metadata = {}, this.parse()
                }
                return e.prototype = {
                    parse: function () {
                        var t = this.metaDocument.documentElement;
                        if ("rdf:rdf" !== t.nodeName.toLowerCase())
                            for (t = t.firstChild; t && "rdf:rdf" !== t.nodeName.toLowerCase();) t = t.nextSibling;
                        var e = t ? t.nodeName.toLowerCase() : null;
                        if (t && "rdf:rdf" === e && t.hasChildNodes()) {
                            var n, i, r, a, s, o, l, c = t.childNodes;
                            for (a = 0, o = c.length; a < o; a++)
                                if ("rdf:description" === (n = c[a]).nodeName.toLowerCase())
                                    for (s = 0, l = n.childNodes.length; s < l; s++) "#text" !== n.childNodes[s].nodeName.toLowerCase() && (r = (i = n.childNodes[s]).nodeName.toLowerCase(), this.metadata[r] = i.textContent.trim())
                        }
                    },
                    get: function (t) {
                        return this.metadata[t] || null
                    },
                    has: function (t) {
                        return void 0 !== this.metadata[t]
                    }
                }, e
            }(), 16),
            q = function () {
                var t = {};
                return {
                    getCanvas: function (e, n, i, r) {
                        var a;
                        if (void 0 !== t[e])(a = t[e]).canvas.width = n, a.canvas.height = i, a.context.setTransform(1, 0, 0, 1, 0, 0);
                        else {
                            var s = v(n, i),
                                o = s.getContext("2d");
                            r && b(o), t[e] = a = {
                                canvas: s,
                                context: o
                            }
                        }
                        return a
                    },
                    clear: function () {
                        for (var e in t) {
                            var n = t[e];
                            n.canvas.width = 0, n.canvas.height = 0, delete t[e]
                        }
                    }
                }
            }(),
            K = function () {
                function t(t) {
                    this.alphaIsShape = !1, this.fontSize = 0, this.fontSizeScale = 1, this.textMatrix = j, this.textMatrixScale = 1, this.fontMatrix = k, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRenderingMode = C.FILL, this.textRise = 0, this.fillColor = "#000000", this.strokeColor = "#000000", this.patternFill = !1, this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.activeSMask = null, this.old = t
                }
                return t.prototype = {
                    clone: function () {
                        return Object.create(this)
                    },
                    setCurrentPoint: function (t, e) {
                        this.x = t, this.y = e
                    }
                }, t
            }(),
            Z = function () {
                function i(t, e, n, i) {
                    this.ctx = t, this.current = new K, this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.res = null, this.xobjs = null, this.commonObjs = e, this.objs = n, this.imageLayer = i, this.groupStack = [], this.processingType3 = null, this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, t && b(t), this.cachedGetSinglePixelWidth = null
                }

                function a(t, e) {
                    if ("undefined" != typeof ImageData && e instanceof ImageData) t.putImageData(e, 0, 0);
                    else {
                        var i, r, a, s, o, l = e.height,
                            c = e.width,
                            h = l % V,
                            u = (l - h) / V,
                            d = 0 === h ? u : u + 1,
                            f = t.createImageData(c, V),
                            p = 0,
                            A = e.data,
                            g = f.data;
                        if (e.kind === F.GRAYSCALE_1BPP) {
                            var m = A.byteLength,
                                v = PDFJS.hasCanvasTypedArrays ? new Uint32Array(g.buffer) : new N(g),
                                b = v.length,
                                S = c + 7 >> 3,
                                x = 4294967295,
                                y = PDFJS.isLittleEndian || !PDFJS.hasCanvasTypedArrays ? 4278190080 : 255;
                            for (r = 0; r < d; r++) {
                                for (s = r < u ? V : h, i = 0, a = 0; a < s; a++) {
                                    for (var P = m - p, k = 0, C = P > S ? c : 8 * P - 7, D = -8 & C, w = 0, T = 0; k < D; k += 8) T = A[p++], v[i++] = 128 & T ? x : y, v[i++] = 64 & T ? x : y, v[i++] = 32 & T ? x : y, v[i++] = 16 & T ? x : y, v[i++] = 8 & T ? x : y, v[i++] = 4 & T ? x : y, v[i++] = 2 & T ? x : y, v[i++] = 1 & T ? x : y;
                                    for (; k < C; k++) 0 === w && (T = A[p++], w = 128), v[i++] = T & w ? x : y, w >>= 1
                                }
                                for (; i < b;) v[i++] = 0;
                                t.putImageData(f, 0, r * V)
                            }
                        } else if (e.kind === F.RGBA_32BPP) {
                            for (a = 0, o = c * V * 4, r = 0; r < u; r++) g.set(A.subarray(p, p + o)), p += o, t.putImageData(f, 0, a), a += V;
                            r < d && (o = c * h * 4, g.set(A.subarray(p, p + o)), t.putImageData(f, 0, a))
                        } else if (e.kind === F.RGB_24BPP)
                            for (o = c * (s = V), r = 0; r < d; r++) {
                                for (r >= u && (o = c * (s = h)), i = 0, a = o; a--;) g[i++] = A[p++], g[i++] = A[p++], g[i++] = A[p++], g[i++] = 255;
                                t.putImageData(f, 0, r * V)
                            } else n("bad image kind: " + e.kind)
                    }
                }

                function o(t, e) {
                    for (var n = e.height, i = e.width, r = n % V, a = (n - r) / V, s = 0 === r ? a : a + 1, o = t.createImageData(i, V), l = 0, c = e.data, h = o.data, u = 0; u < s; u++) {
                        for (var d = u < a ? V : r, f = 3, p = 0; p < d; p++)
                            for (var A = 0, g = 0; g < i; g++) {
                                if (!A) {
                                    var m = c[l++];
                                    A = 128
                                }
                                h[f] = m & A ? 0 : 255, f += 4, A >>= 1
                            }
                        t.putImageData(o, 0, u * V)
                    }
                }

                function l(t, e) {
                    for (var n = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font"], i = 0, r = n.length; i < r; i++) {
                        var a = n[i];
                        void 0 !== t[a] && (e[a] = t[a])
                    }
                    void 0 !== t.setLineDash ? (e.setLineDash(t.getLineDash()), e.lineDashOffset = t.lineDashOffset) : void 0 !== t.mozDashOffset && (e.mozDash = t.mozDash, e.mozDashOffset = t.mozDashOffset)
                }

                function c(t, e, n, i) {
                    for (var r = t.length, a = 3; a < r; a += 4) {
                        var s = t[a];
                        if (0 === s) t[a - 3] = e, t[a - 2] = n, t[a - 1] = i;
                        else if (s < 255) {
                            var o = 255 - s;
                            t[a - 3] = t[a - 3] * s + e * o >> 8, t[a - 2] = t[a - 2] * s + n * o >> 8, t[a - 1] = t[a - 1] * s + i * o >> 8
                        }
                    }
                }

                function h(t, e) {
                    for (var n = t.length, i = 3; i < n; i += 4) {
                        var r = t[i];
                        e[i] = e[i] * r * (1 / 255) | 0
                    }
                }

                function u(t, e) {
                    for (var n = t.length, i = 3; i < n; i += 4) {
                        var r = 77 * t[i - 3] + 152 * t[i - 2] + 28 * t[i - 1];
                        e[i] = e[i] * r >> 16
                    }
                }

                function p(t, e, n, i, r, a) {
                    var s, o = !!a,
                        l = o ? a[0] : 0,
                        d = o ? a[1] : 0,
                        f = o ? a[2] : 0;
                    s = "Luminosity" === r ? u : h;
                    for (var p = Math.min(i, Math.ceil(1048576 / n)), A = 0; A < i; A += p) {
                        var g = Math.min(p, i - A),
                            m = t.getImageData(0, A, n, g),
                            v = e.getImageData(0, A, n, g);
                        o && c(m.data, l, d, f), s(m.data, v.data), t.putImageData(v, 0, A)
                    }
                }

                function A(t, e, n) {
                    var i = e.canvas,
                        r = e.context;
                    t.setTransform(e.scaleX, 0, 0, e.scaleY, e.offsetX, e.offsetY);
                    var a = e.backdrop || null;
                    if ($.isEnabled) {
                        var s = $.composeSMask(n.canvas, i, {
                            subtype: e.subtype,
                            backdrop: a
                        });
                        return t.setTransform(1, 0, 0, 1, 0, 0), void t.drawImage(s, e.offsetX, e.offsetY)
                    }
                    p(r, n, i.width, i.height, e.subtype, a), t.drawImage(i, 0, 0)
                }
                var g = ["butt", "round", "square"],
                    m = ["miter", "round", "bevel"],
                    v = {},
                    y = {};
                i.prototype = {
                    beginDrawing: function (t, e) {
                        var n = this.ctx.canvas.width,
                            i = this.ctx.canvas.height;
                        e ? this.ctx.clearRect(0, 0, n, i) : (this.ctx.mozOpaque = !0, this.ctx.save(), this.ctx.fillStyle = "rgb(255, 255, 255)", this.ctx.fillRect(0, 0, n, i), this.ctx.restore());
                        var r = t.transform;
                        this.ctx.save(), this.ctx.transform.apply(this.ctx, r), this.baseTransform = this.ctx.mozCurrentTransform.slice(), this.imageLayer && this.imageLayer.beginLayout()
                    },
                    executeOperatorList: function (t, e, n, i) {
                        var r = t.argsArray,
                            a = t.fnArray,
                            s = e || 0,
                            o = r.length;
                        if (o === s) return s;
                        for (var l, c = o - s > 10 && "function" == typeof n, h = c ? Date.now() + 15 : 0, u = 0, d = this.commonObjs, f = this.objs;;) {
                            if (void 0 !== i && s === i.nextBreakPoint) return i.breakIt(s, n), s;
                            if ((l = a[s]) !== w.dependency) this[l].apply(this, r[s]);
                            else
                                for (var p = r[s], A = 0, g = p.length; A < g; A++) {
                                    var m = p[A],
                                        v = "g" === m[0] && "_" === m[1] ? d : f;
                                    if (!v.isResolved(m)) return v.get(m, n), s
                                }
                            if (++s === o) return s;
                            if (c && ++u > 10) {
                                if (Date.now() > h) return n(), s;
                                u = 0
                            }
                        }
                    },
                    endDrawing: function () {
                        this.ctx.restore(), q.clear(), $.clear(), this.imageLayer && this.imageLayer.endLayout()
                    },
                    setLineWidth: function (t) {
                        this.current.lineWidth = t, this.ctx.lineWidth = t
                    },
                    setLineCap: function (t) {
                        this.ctx.lineCap = g[t]
                    },
                    setLineJoin: function (t) {
                        this.ctx.lineJoin = m[t]
                    },
                    setMiterLimit: function (t) {
                        this.ctx.miterLimit = t
                    },
                    setDash: function (t, e) {
                        var n = this.ctx;
                        void 0 !== n.setLineDash ? (n.setLineDash(t), n.lineDashOffset = e) : (n.mozDash = t, n.mozDashOffset = e)
                    },
                    setRenderingIntent: function (t) {},
                    setFlatness: function (t) {},
                    setGState: function (t) {
                        for (var n = 0, i = t.length; n < i; n++) {
                            var r = t[n],
                                a = r[0],
                                s = r[1];
                            switch (a) {
                                case "LW":
                                    this.setLineWidth(s);
                                    break;
                                case "LC":
                                    this.setLineCap(s);
                                    break;
                                case "LJ":
                                    this.setLineJoin(s);
                                    break;
                                case "ML":
                                    this.setMiterLimit(s);
                                    break;
                                case "D":
                                    this.setDash(s[0], s[1]);
                                    break;
                                case "RI":
                                    this.setRenderingIntent(s);
                                    break;
                                case "FL":
                                    this.setFlatness(s);
                                    break;
                                case "Font":
                                    this.setFont(s[0], s[1]);
                                    break;
                                case "CA":
                                    this.current.strokeAlpha = r[1];
                                    break;
                                case "ca":
                                    this.current.fillAlpha = r[1], this.ctx.globalAlpha = r[1];
                                    break;
                                case "BM":
                                    if (s && s.name && "Normal" !== s.name) {
                                        var o = s.name.replace(/([A-Z])/g, function (t) {
                                            return "-" + t.toLowerCase()
                                        }).substring(1);
                                        this.ctx.globalCompositeOperation = o, this.ctx.globalCompositeOperation !== o && e('globalCompositeOperation "' + o + '" is not supported')
                                    } else this.ctx.globalCompositeOperation = "source-over";
                                    break;
                                case "SMask":
                                    this.current.activeSMask && this.endSMaskGroup(), this.current.activeSMask = s ? this.tempSMask : null, this.current.activeSMask && this.beginSMaskGroup(), this.tempSMask = null
                            }
                        }
                    },
                    beginSMaskGroup: function () {
                        var t = this.current.activeSMask,
                            e = t.canvas.width,
                            n = t.canvas.height,
                            i = "smaskGroupAt" + this.groupLevel,
                            r = q.getCanvas(i, e, n, !0),
                            a = this.ctx,
                            s = a.mozCurrentTransform;
                        this.ctx.save();
                        var o = r.context;
                        o.scale(1 / t.scaleX, 1 / t.scaleY), o.translate(-t.offsetX, -t.offsetY), o.transform.apply(o, s), l(a, o), this.ctx = o, this.setGState([
                            ["BM", "Normal"],
                            ["ca", 1],
                            ["CA", 1]
                        ]), this.groupStack.push(a), this.groupLevel++
                    },
                    endSMaskGroup: function () {
                        var t = this.ctx;
                        this.groupLevel--, this.ctx = this.groupStack.pop(), A(this.ctx, this.current.activeSMask, t), this.ctx.restore()
                    },
                    save: function () {
                        this.ctx.save();
                        var t = this.current;
                        this.stateStack.push(t), this.current = t.clone(), this.current.activeSMask = null
                    },
                    restore: function () {
                        0 !== this.stateStack.length && (null !== this.current.activeSMask && this.endSMaskGroup(), this.current = this.stateStack.pop(), this.ctx.restore(), this.cachedGetSinglePixelWidth = null)
                    },
                    transform: function (t, e, n, i, r, a) {
                        this.ctx.transform(t, e, n, i, r, a), this.cachedGetSinglePixelWidth = null
                    },
                    constructPath: function (t, e) {
                        for (var n = this.ctx, i = this.current, r = i.x, a = i.y, s = 0, o = 0, l = t.length; s < l; s++) switch (0 | t[s]) {
                            case w.rectangle:
                                r = e[o++], a = e[o++];
                                var c = e[o++],
                                    h = e[o++];
                                0 === c && (c = this.getSinglePixelWidth()), 0 === h && (h = this.getSinglePixelWidth());
                                var u = r + c,
                                    d = a + h;
                                this.ctx.moveTo(r, a), this.ctx.lineTo(u, a), this.ctx.lineTo(u, d), this.ctx.lineTo(r, d), this.ctx.lineTo(r, a), this.ctx.closePath();
                                break;
                            case w.moveTo:
                                r = e[o++], a = e[o++], n.moveTo(r, a);
                                break;
                            case w.lineTo:
                                r = e[o++], a = e[o++], n.lineTo(r, a);
                                break;
                            case w.curveTo:
                                r = e[o + 4], a = e[o + 5], n.bezierCurveTo(e[o], e[o + 1], e[o + 2], e[o + 3], r, a), o += 6;
                                break;
                            case w.curveTo2:
                                n.bezierCurveTo(r, a, e[o], e[o + 1], e[o + 2], e[o + 3]), r = e[o + 2], a = e[o + 3], o += 4;
                                break;
                            case w.curveTo3:
                                r = e[o + 2], a = e[o + 3], n.bezierCurveTo(e[o], e[o + 1], r, a, r, a), o += 4;
                                break;
                            case w.closePath:
                                n.closePath()
                        }
                        i.setCurrentPoint(r, a)
                    },
                    closePath: function () {
                        this.ctx.closePath()
                    },
                    stroke: function (t) {
                        t = void 0 === t || t;
                        var e = this.ctx,
                            n = this.current.strokeColor;
                        e.lineWidth = Math.max(.65 * this.getSinglePixelWidth(), this.current.lineWidth), e.globalAlpha = this.current.strokeAlpha, n && n.hasOwnProperty("type") && "Pattern" === n.type ? (e.save(), e.strokeStyle = n.getPattern(e, this), e.stroke(), e.restore()) : e.stroke(), t && this.consumePath(), e.globalAlpha = this.current.fillAlpha
                    },
                    closeStroke: function () {
                        this.closePath(), this.stroke()
                    },
                    fill: function (t) {
                        t = void 0 === t || t;
                        var e = this.ctx,
                            n = this.current.fillColor,
                            i = !1;
                        if (this.current.patternFill && (e.save(), e.fillStyle = n.getPattern(e, this), i = !0), this.pendingEOFill) {
                            if (void 0 !== e.mozFillRule) e.mozFillRule = "evenodd", e.fill(), e.mozFillRule = "nonzero";
                            else try {
                                e.fill("evenodd")
                            } catch (t) {
                                e.fill()
                            }
                            this.pendingEOFill = !1
                        } else e.fill();
                        i && e.restore(), t && this.consumePath()
                    },
                    eoFill: function () {
                        this.pendingEOFill = !0, this.fill()
                    },
                    fillStroke: function () {
                        this.fill(!1), this.stroke(!1), this.consumePath()
                    },
                    eoFillStroke: function () {
                        this.pendingEOFill = !0, this.fillStroke()
                    },
                    closeFillStroke: function () {
                        this.closePath(), this.fillStroke()
                    },
                    closeEOFillStroke: function () {
                        this.pendingEOFill = !0, this.closePath(), this.fillStroke()
                    },
                    endPath: function () {
                        this.consumePath()
                    },
                    clip: function () {
                        this.pendingClip = v
                    },
                    eoClip: function () {
                        this.pendingClip = y
                    },
                    beginText: function () {
                        this.current.textMatrix = j, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0
                    },
                    endText: function () {
                        var t = this.pendingTextPaths,
                            e = this.ctx;
                        if (void 0 !== t) {
                            e.save(), e.beginPath();
                            for (var n = 0; n < t.length; n++) {
                                var i = t[n];
                                e.setTransform.apply(e, i.transform), e.translate(i.x, i.y), i.addToPath(e, i.fontSize)
                            }
                            e.restore(), e.clip(), e.beginPath(), delete this.pendingTextPaths
                        } else e.beginPath()
                    },
                    setCharSpacing: function (t) {
                        this.current.charSpacing = t
                    },
                    setWordSpacing: function (t) {
                        this.current.wordSpacing = t
                    },
                    setHScale: function (t) {
                        this.current.textHScale = t / 100
                    },
                    setLeading: function (t) {
                        this.current.leading = -t
                    },
                    setFont: function (t, i) {
                        var r = this.commonObjs.get(t),
                            a = this.current;
                        if (r || n("Can't find font for " + t), a.fontMatrix = r.fontMatrix ? r.fontMatrix : k, 0 !== a.fontMatrix[0] && 0 !== a.fontMatrix[3] || e("Invalid font matrix for font " + t), i < 0 ? (i = -i, a.fontDirection = -1) : a.fontDirection = 1, this.current.font = r, this.current.fontSize = i, !r.isType3Font) {
                            var s = r.loadedName || "sans-serif",
                                o = r.black ? r.bold ? "bolder" : "bold" : r.bold ? "bold" : "normal",
                                l = r.italic ? "italic" : "normal",
                                c = '"' + s + '", ' + r.fallbackName,
                                h = i < 16 ? 16 : i > 100 ? 100 : i;
                            this.current.fontSizeScale = i / h;
                            var u = l + " " + o + " " + h + "px " + c;
                            this.ctx.font = u
                        }
                    },
                    setTextRenderingMode: function (t) {
                        this.current.textRenderingMode = t
                    },
                    setTextRise: function (t) {
                        this.current.textRise = t
                    },
                    moveText: function (t, e) {
                        this.current.x = this.current.lineX += t, this.current.y = this.current.lineY += e
                    },
                    setLeadingMoveText: function (t, e) {
                        this.setLeading(-e), this.moveText(t, e)
                    },
                    setTextMatrix: function (t, e, n, i, r, a) {
                        this.current.textMatrix = [t, e, n, i, r, a], this.current.textMatrixScale = Math.sqrt(t * t + e * e), this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0
                    },
                    nextLine: function () {
                        this.moveText(0, this.current.leading)
                    },
                    paintChar: function (t, e, n) {
                        var i, r = this.ctx,
                            a = this.current,
                            s = a.font,
                            o = a.textRenderingMode,
                            l = a.fontSize / a.fontSizeScale,
                            c = o & C.FILL_STROKE_MASK,
                            h = !!(o & C.ADD_TO_PATH_FLAG);
                        (s.disableFontFace || h) && (i = s.getPathGenerator(this.commonObjs, t)), s.disableFontFace ? (r.save(), r.translate(e, n), r.beginPath(), i(r, l), c !== C.FILL && c !== C.FILL_STROKE || r.fill(), c !== C.STROKE && c !== C.FILL_STROKE || r.stroke(), r.restore()) : (c !== C.FILL && c !== C.FILL_STROKE || r.fillText(t, e, n), c !== C.STROKE && c !== C.FILL_STROKE || r.strokeText(t, e, n)), h && (this.pendingTextPaths || (this.pendingTextPaths = [])).push({
                            transform: r.mozCurrentTransform,
                            x: e,
                            y: n,
                            fontSize: l,
                            addToPath: i
                        })
                    },
                    get isFontSubpixelAAEnabled() {
                        var t = document.createElement("canvas").getContext("2d");
                        t.scale(1.5, 1), t.fillText("I", 0, 10);
                        for (var e = t.getImageData(0, 0, 10, 10).data, n = !1, i = 3; i < e.length; i += 4)
                            if (e[i] > 0 && e[i] < 255) {
                                n = !0;
                                break
                            } return s(this, "isFontSubpixelAAEnabled", n)
                    },
                    showText: function (t) {
                        var e = this.current,
                            n = e.font;
                        if (n.isType3Font) return this.showType3Text(t);
                        var i = e.fontSize;
                        if (0 !== i) {
                            var r = this.ctx,
                                a = e.fontSizeScale,
                                s = e.charSpacing,
                                o = e.wordSpacing,
                                l = e.fontDirection,
                                c = e.textHScale * l,
                                h = t.length,
                                u = n.vertical,
                                f = n.defaultVMetrics,
                                p = i * e.fontMatrix[0],
                                A = e.textRenderingMode === C.FILL && !n.disableFontFace;
                            r.save(), r.transform.apply(r, e.textMatrix), r.translate(e.x, e.y + e.textRise), l > 0 ? r.scale(c, -1) : r.scale(c, 1);
                            var g = e.lineWidth,
                                m = e.textMatrixScale;
                            if (0 === m || 0 === g) {
                                var v = e.textRenderingMode & C.FILL_STROKE_MASK;
                                v !== C.STROKE && v !== C.FILL_STROKE || (this.cachedGetSinglePixelWidth = null, g = .65 * this.getSinglePixelWidth())
                            } else g /= m;
                            1 !== a && (r.scale(a, a), g /= a), r.lineWidth = g;
                            var b, S = 0;
                            for (b = 0; b < h; ++b) {
                                var x = t[b];
                                if (null !== x)
                                    if (d(x)) S += -x * i * .001;
                                    else {
                                        var y, P, k, F, D = !1,
                                            w = x.fontChar,
                                            T = x.accent,
                                            L = x.width;
                                        if (u) {
                                            var R, E, I;
                                            R = x.vmetric || f, E = -(E = x.vmetric ? R[1] : .5 * L) * p, I = R[2] * p, L = R ? -R[0] : L, y = E / a, P = (S + I) / a
                                        } else y = S / a, P = 0;
                                        if (n.remeasure && L > 0 && this.isFontSubpixelAAEnabled) {
                                            var M = L / (1e3 * r.measureText(w).width / i * a);
                                            D = !0, r.save(), r.scale(M, 1), y /= M
                                        }
                                        A && !T ? r.fillText(w, y, P) : (this.paintChar(w, y, P), T && (k = y + T.offset.x / a, F = P - T.offset.y / a, this.paintChar(T.fontChar, k, F))), S += L * p + s * l, D && r.restore()
                                    }
                                else S += l * o
                            }
                            u ? e.y -= S * c : e.x += S * c, r.restore()
                        }
                    },
                    showType3Text: function (t) {
                        var n, i, r, a = this.ctx,
                            s = this.current,
                            o = s.font,
                            l = s.fontSize,
                            c = s.fontDirection,
                            h = s.charSpacing,
                            u = s.wordSpacing,
                            f = s.textHScale * c,
                            p = s.fontMatrix || k,
                            A = t.length;
                        if (!(s.textRenderingMode === C.INVISIBLE) && 0 !== l) {
                            for (a.save(), a.transform.apply(a, s.textMatrix), a.translate(s.x, s.y), a.scale(f, c), n = 0; n < A; ++n)
                                if (null !== (i = t[n]))
                                    if (d(i)) {
                                        var g = .001 * -i * l;
                                        this.ctx.translate(g, 0), s.x += g * f
                                    } else {
                                        var m = o.charProcOperatorList[i.operatorListId];
                                        m ? (this.processingType3 = i, this.save(), a.scale(l, l), a.transform.apply(a, p), this.executeOperatorList(m), this.restore(), r = J.applyTransform([i.width, 0], p)[0] * l + h, a.translate(r, 0), s.x += r * f) : e('Type3 character "' + i.operatorListId + '" is not available')
                                    }
                            else this.ctx.translate(u, 0), s.x += u * f;
                            a.restore(), this.processingType3 = null
                        }
                    },
                    setCharWidth: function (t, e) {},
                    setCharWidthAndBounds: function (t, e, n, i, r, a) {
                        this.ctx.rect(n, i, r - n, a - i), this.clip(), this.endPath()
                    },
                    getColorN_Pattern: function (t) {
                        var e;
                        if ("TilingPattern" === t[0]) {
                            var n = t[1];
                            e = new nt(t, n, this.ctx, this.objs, this.commonObjs, this.baseTransform)
                        } else e = x(t);
                        return e
                    },
                    setStrokeColorN: function () {
                        this.current.strokeColor = this.getColorN_Pattern(arguments)
                    },
                    setFillColorN: function () {
                        this.current.fillColor = this.getColorN_Pattern(arguments), this.current.patternFill = !0
                    },
                    setStrokeRGBColor: function (t, e, n) {
                        var i = J.makeCssRgb(t, e, n);
                        this.ctx.strokeStyle = i, this.current.strokeColor = i
                    },
                    setFillRGBColor: function (t, e, n) {
                        var i = J.makeCssRgb(t, e, n);
                        this.ctx.fillStyle = i, this.current.fillColor = i, this.current.patternFill = !1
                    },
                    shadingFill: function (t) {
                        var e = this.ctx;
                        this.save();
                        var n = x(t);
                        e.fillStyle = n.getPattern(e, this, !0);
                        var i = e.mozCurrentTransformInverse;
                        if (i) {
                            var r = e.canvas,
                                a = r.width,
                                s = r.height,
                                o = J.applyTransform([0, 0], i),
                                l = J.applyTransform([0, s], i),
                                c = J.applyTransform([a, 0], i),
                                h = J.applyTransform([a, s], i),
                                u = Math.min(o[0], l[0], c[0], h[0]),
                                d = Math.min(o[1], l[1], c[1], h[1]),
                                f = Math.max(o[0], l[0], c[0], h[0]),
                                p = Math.max(o[1], l[1], c[1], h[1]);
                            this.ctx.fillRect(u, d, f - u, p - d)
                        } else this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
                        this.restore()
                    },
                    beginInlineImage: function () {
                        n("Should not call beginInlineImage")
                    },
                    beginImageData: function () {
                        n("Should not call beginImageData")
                    },
                    paintFormXObjectBegin: function (t, e) {
                        if (this.save(), this.baseTransformStack.push(this.baseTransform), f(t) && 6 === t.length && this.transform.apply(this, t), this.baseTransform = this.ctx.mozCurrentTransform, f(e) && 4 === e.length) {
                            var n = e[2] - e[0],
                                i = e[3] - e[1];
                            this.ctx.rect(e[0], e[1], n, i), this.clip(), this.endPath()
                        }
                    },
                    paintFormXObjectEnd: function () {
                        this.restore(), this.baseTransform = this.baseTransformStack.pop()
                    },
                    beginGroup: function (n) {
                        this.save();
                        var i = this.ctx;
                        n.isolated || t("TODO: Support non-isolated groups."), n.knockout && e("Knockout groups not supported.");
                        var a = i.mozCurrentTransform;
                        n.matrix && i.transform.apply(i, n.matrix), r(n.bbox, "Bounding box is required.");
                        var s = J.getAxialAlignedBoundingBox(n.bbox, i.mozCurrentTransform),
                            o = [0, 0, i.canvas.width, i.canvas.height];
                        s = J.intersect(s, o) || [0, 0, 0, 0];
                        var c = Math.floor(s[0]),
                            h = Math.floor(s[1]),
                            u = Math.max(Math.ceil(s[2]) - c, 1),
                            d = Math.max(Math.ceil(s[3]) - h, 1),
                            f = 1,
                            p = 1;
                        u > 4096 && (f = u / 4096, u = 4096), d > 4096 && (p = d / 4096, d = 4096);
                        var A = "groupAt" + this.groupLevel;
                        n.smask && (A += "_smask_" + this.smaskCounter++ % 2);
                        var g = q.getCanvas(A, u, d, !0),
                            m = g.context;
                        m.scale(1 / f, 1 / p), m.translate(-c, -h), m.transform.apply(m, a), n.smask ? this.smaskStack.push({
                            canvas: g.canvas,
                            context: m,
                            offsetX: c,
                            offsetY: h,
                            scaleX: f,
                            scaleY: p,
                            subtype: n.smask.subtype,
                            backdrop: n.smask.backdrop
                        }) : (i.setTransform(1, 0, 0, 1, 0, 0), i.translate(c, h), i.scale(f, p)), l(i, m), this.ctx = m, this.setGState([
                            ["BM", "Normal"],
                            ["ca", 1],
                            ["CA", 1]
                        ]), this.groupStack.push(i), this.groupLevel++
                    },
                    endGroup: function (t) {
                        this.groupLevel--;
                        var e = this.ctx;
                        this.ctx = this.groupStack.pop(), void 0 !== this.ctx.imageSmoothingEnabled ? this.ctx.imageSmoothingEnabled = !1 : this.ctx.mozImageSmoothingEnabled = !1, t.smask ? this.tempSMask = this.smaskStack.pop() : this.ctx.drawImage(e.canvas, 0, 0), this.restore()
                    },
                    beginAnnotations: function () {
                        this.save(), this.current = new K
                    },
                    endAnnotations: function () {
                        this.restore()
                    },
                    beginAnnotation: function (t, e, n) {
                        if (this.save(), f(t) && 4 === t.length) {
                            var i = t[2] - t[0],
                                r = t[3] - t[1];
                            this.ctx.rect(t[0], t[1], i, r), this.clip(), this.endPath()
                        }
                        this.transform.apply(this, e), this.transform.apply(this, n)
                    },
                    endAnnotation: function () {
                        this.restore()
                    },
                    paintJpegXObject: function (t, n, i) {
                        var r = this.objs.get(t);
                        if (r) {
                            this.save();
                            var a = this.ctx;
                            if (a.scale(1 / n, -1 / i), a.drawImage(r, 0, 0, r.width, r.height, 0, -i, n, i), this.imageLayer) {
                                var s = a.mozCurrentTransformInverse,
                                    o = this.getCanvasPosition(0, 0);
                                this.imageLayer.appendImage({
                                    objId: t,
                                    left: o[0],
                                    top: o[1],
                                    width: n / s[0],
                                    height: i / s[3]
                                })
                            }
                            this.restore()
                        } else e("Dependent image isn't ready yet")
                    },
                    paintImageMaskXObject: function (t) {
                        var e = this.ctx,
                            n = t.width,
                            i = t.height,
                            r = this.current.fillColor,
                            a = this.current.patternFill,
                            s = this.processingType3;
                        if (s && void 0 === s.compiled && (s.compiled = n <= 1e3 && i <= 1e3 ? S({
                                data: t.data,
                                width: n,
                                height: i
                            }) : null), s && s.compiled) s.compiled(e);
                        else {
                            var l = q.getCanvas("maskCanvas", n, i),
                                c = l.context;
                            c.save(), o(c, t), c.globalCompositeOperation = "source-in", c.fillStyle = a ? r.getPattern(c, this) : r, c.fillRect(0, 0, n, i), c.restore(), this.paintInlineImageXObject(l.canvas)
                        }
                    },
                    paintImageMaskXObjectRepeat: function (t, e, n, i) {
                        var r = t.width,
                            a = t.height,
                            s = this.current.fillColor,
                            l = this.current.patternFill,
                            c = q.getCanvas("maskCanvas", r, a),
                            h = c.context;
                        h.save(), o(h, t), h.globalCompositeOperation = "source-in", h.fillStyle = l ? s.getPattern(h, this) : s, h.fillRect(0, 0, r, a), h.restore();
                        for (var u = this.ctx, d = 0, f = i.length; d < f; d += 2) u.save(), u.transform(e, 0, 0, n, i[d], i[d + 1]), u.scale(1, -1), u.drawImage(c.canvas, 0, 0, r, a, 0, -1, 1, 1), u.restore()
                    },
                    paintImageMaskXObjectGroup: function (t) {
                        for (var e = this.ctx, n = this.current.fillColor, i = this.current.patternFill, r = 0, a = t.length; r < a; r++) {
                            var s = t[r],
                                l = s.width,
                                c = s.height,
                                h = q.getCanvas("maskCanvas", l, c),
                                u = h.context;
                            u.save(), o(u, s), u.globalCompositeOperation = "source-in", u.fillStyle = i ? n.getPattern(u, this) : n, u.fillRect(0, 0, l, c), u.restore(), e.save(), e.transform.apply(e, s.transform), e.scale(1, -1), e.drawImage(h.canvas, 0, 0, l, c, 0, -1, 1, 1), e.restore()
                        }
                    },
                    paintImageXObject: function (t) {
                        var n = this.objs.get(t);
                        n ? this.paintInlineImageXObject(n) : e("Dependent image isn't ready yet")
                    },
                    paintImageXObjectRepeat: function (t, n, i, r) {
                        var a = this.objs.get(t);
                        if (a) {
                            for (var s = a.width, o = a.height, l = [], c = 0, h = r.length; c < h; c += 2) l.push({
                                transform: [n, 0, 0, i, r[c], r[c + 1]],
                                x: 0,
                                y: 0,
                                w: s,
                                h: o
                            });
                            this.paintInlineImageXObjectGroup(a, l)
                        } else e("Dependent image isn't ready yet")
                    },
                    paintInlineImageXObject: function (t) {
                        var e = t.width,
                            n = t.height,
                            i = this.ctx;
                        this.save(), i.scale(1 / e, -1 / n);
                        var r, s, o = i.mozCurrentTransformInverse,
                            l = o[0],
                            c = o[1],
                            h = Math.max(Math.sqrt(l * l + c * c), 1),
                            u = o[2],
                            d = o[3],
                            f = Math.max(Math.sqrt(u * u + d * d), 1);
                        if (t instanceof HTMLElement || !t.data) r = t;
                        else {
                            var p = (s = q.getCanvas("inlineImage", e, n)).context;
                            a(p, t), r = s.canvas
                        }
                        for (var A = e, g = n, m = "prescale1"; h > 2 && A > 1 || f > 2 && g > 1;) {
                            var v = A,
                                b = g;
                            h > 2 && A > 1 && (h /= A / (v = Math.ceil(A / 2))), f > 2 && g > 1 && (f /= g / (b = Math.ceil(g / 2))), (p = (s = q.getCanvas(m, v, b)).context).clearRect(0, 0, v, b), p.drawImage(r, 0, 0, A, g, 0, 0, v, b), r = s.canvas, A = v, g = b, m = "prescale1" === m ? "prescale2" : "prescale1"
                        }
                        if (i.drawImage(r, 0, 0, A, g, 0, -n, e, n), this.imageLayer) {
                            var S = this.getCanvasPosition(0, -n);
                            this.imageLayer.appendImage({
                                imgData: t,
                                left: S[0],
                                top: S[1],
                                width: e / o[0],
                                height: n / o[3]
                            })
                        }
                        this.restore()
                    },
                    paintInlineImageXObjectGroup: function (t, e) {
                        var n = this.ctx,
                            i = t.width,
                            r = t.height,
                            s = q.getCanvas("inlineImage", i, r);
                        a(s.context, t);
                        for (var o = 0, l = e.length; o < l; o++) {
                            var c = e[o];
                            if (n.save(), n.transform.apply(n, c.transform), n.scale(1, -1), n.drawImage(s.canvas, c.x, c.y, c.w, c.h, 0, -1, 1, 1), this.imageLayer) {
                                var h = this.getCanvasPosition(c.x, c.y);
                                this.imageLayer.appendImage({
                                    imgData: t,
                                    left: h[0],
                                    top: h[1],
                                    width: i,
                                    height: r
                                })
                            }
                            n.restore()
                        }
                    },
                    paintSolidColorImageMask: function () {
                        this.ctx.fillRect(0, 0, 1, 1)
                    },
                    markPoint: function (t) {},
                    markPointProps: function (t, e) {},
                    beginMarkedContent: function (t) {},
                    beginMarkedContentProps: function (t, e) {},
                    endMarkedContent: function () {},
                    beginCompat: function () {},
                    endCompat: function () {},
                    consumePath: function () {
                        var t = this.ctx;
                        if (this.pendingClip) {
                            if (this.pendingClip === y)
                                if (void 0 !== t.mozFillRule) t.mozFillRule = "evenodd", t.clip(), t.mozFillRule = "nonzero";
                                else try {
                                    t.clip("evenodd")
                                } catch (e) {
                                    t.clip()
                                } else t.clip();
                            this.pendingClip = null
                        }
                        t.beginPath()
                    },
                    getSinglePixelWidth: function (t) {
                        if (null === this.cachedGetSinglePixelWidth) {
                            var e = this.ctx.mozCurrentTransformInverse;
                            this.cachedGetSinglePixelWidth = Math.sqrt(Math.max(e[0] * e[0] + e[1] * e[1], e[2] * e[2] + e[3] * e[3]))
                        }
                        return this.cachedGetSinglePixelWidth
                    },
                    getCanvasPosition: function (t, e) {
                        var n = this.ctx.mozCurrentTransform;
                        return [n[0] * t + n[2] * e + n[4], n[1] * t + n[3] * e + n[5]]
                    }
                };
                for (var P in w) i.prototype[w[P]] = i.prototype[P];
                return i
            }(),
            $ = function () {
                function t(t, e, n) {
                    var i = t.createShader(n);
                    if (t.shaderSource(i, e), t.compileShader(i), !t.getShaderParameter(i, t.COMPILE_STATUS)) {
                        var r = t.getShaderInfoLog(i);
                        throw new Error("Error during shader compilation: " + r)
                    }
                    return i
                }

                function e(e, n) {
                    return t(e, n, e.VERTEX_SHADER)
                }

                function n(e, n) {
                    return t(e, n, e.FRAGMENT_SHADER)
                }

                function i(t, e) {
                    for (var n = t.createProgram(), i = 0, r = e.length; i < r; ++i) t.attachShader(n, e[i]);
                    if (t.linkProgram(n), !t.getProgramParameter(n, t.LINK_STATUS)) {
                        var a = t.getProgramInfoLog(n);
                        throw new Error("Error during program linking: " + a)
                    }
                    return n
                }

                function r(t, e, n) {
                    t.activeTexture(n);
                    var i = t.createTexture();
                    return t.bindTexture(t.TEXTURE_2D, i), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), i
                }

                function a() {
                    c || (h = document.createElement("canvas"), c = h.getContext("webgl", {
                        premultipliedalpha: !1
                    }))
                }

                function o() {
                    var t, r;
                    a(), t = h, h = null, r = c, c = null;
                    var s = i(r, [e(r, u), n(r, d)]);
                    r.useProgram(s);
                    var o = {};
                    o.gl = r, o.canvas = t, o.resolutionLocation = r.getUniformLocation(s, "u_resolution"), o.positionLocation = r.getAttribLocation(s, "a_position"), o.backdropLocation = r.getUniformLocation(s, "u_backdrop"), o.subtypeLocation = r.getUniformLocation(s, "u_subtype");
                    var l = r.getAttribLocation(s, "a_texCoord"),
                        p = r.getUniformLocation(s, "u_image"),
                        A = r.getUniformLocation(s, "u_mask"),
                        g = r.createBuffer();
                    r.bindBuffer(r.ARRAY_BUFFER, g), r.bufferData(r.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), r.STATIC_DRAW), r.enableVertexAttribArray(l), r.vertexAttribPointer(l, 2, r.FLOAT, !1, 0, 0), r.uniform1i(p, 0), r.uniform1i(A, 1), f = o
                }

                function l() {
                    var t, r;
                    a(), t = h, h = null, r = c, c = null;
                    var s = i(r, [e(r, p), n(r, A)]);
                    r.useProgram(s);
                    var o = {};
                    o.gl = r, o.canvas = t, o.resolutionLocation = r.getUniformLocation(s, "u_resolution"), o.scaleLocation = r.getUniformLocation(s, "u_scale"), o.offsetLocation = r.getUniformLocation(s, "u_offset"), o.positionLocation = r.getAttribLocation(s, "a_position"), o.colorLocation = r.getAttribLocation(s, "a_color"), g = o
                }
                var c, h, u = "  attribute vec2 a_position;                                      attribute vec2 a_texCoord;                                                                                                      uniform vec2 u_resolution;                                                                                                      varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;       gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_texCoord = a_texCoord;                                      }                                                             ",
                    d = "  precision mediump float;                                                                                                        uniform vec4 u_backdrop;                                        uniform int u_subtype;                                          uniform sampler2D u_image;                                      uniform sampler2D u_mask;                                                                                                       varying vec2 v_texCoord;                                                                                                        void main() {                                                     vec4 imageColor = texture2D(u_image, v_texCoord);               vec4 maskColor = texture2D(u_mask, v_texCoord);                 if (u_backdrop.a > 0.0) {                                         maskColor.rgb = maskColor.rgb * maskColor.a +                                   u_backdrop.rgb * (1.0 - maskColor.a);         }                                                               float lum;                                                      if (u_subtype == 0) {                                             lum = maskColor.a;                                            } else {                                                          lum = maskColor.r * 0.3 + maskColor.g * 0.59 +                        maskColor.b * 0.11;                                     }                                                               imageColor.a *= lum;                                            imageColor.rgb *= imageColor.a;                                 gl_FragColor = imageColor;                                    }                                                             ",
                    f = null,
                    p = "  attribute vec2 a_position;                                      attribute vec3 a_color;                                                                                                         uniform vec2 u_resolution;                                      uniform vec2 u_scale;                                           uniform vec2 u_offset;                                                                                                          varying vec4 v_color;                                                                                                           void main() {                                                     vec2 position = (a_position + u_offset) * u_scale;              vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;         gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);                                                                              v_color = vec4(a_color / 255.0, 1.0);                         }                                                             ",
                    A = "  precision mediump float;                                                                                                        varying vec4 v_color;                                                                                                           void main() {                                                     gl_FragColor = v_color;                                       }                                                             ",
                    g = null;
                return {
                    get isEnabled() {
                        if (PDFJS.disableWebGL) return !1;
                        var t = !1;
                        try {
                            a(), t = !!c
                        } catch (t) {}
                        return s(this, "isEnabled", t)
                    },
                    composeSMask: function (t, e, n) {
                        var i = t.width,
                            a = t.height;
                        f || o();
                        var s = f,
                            l = s.canvas,
                            c = s.gl;
                        l.width = i, l.height = a, c.viewport(0, 0, c.drawingBufferWidth, c.drawingBufferHeight), c.uniform2f(s.resolutionLocation, i, a), n.backdrop ? c.uniform4f(s.resolutionLocation, n.backdrop[0], n.backdrop[1], n.backdrop[2], 1) : c.uniform4f(s.resolutionLocation, 0, 0, 0, 0), c.uniform1i(s.subtypeLocation, "Luminosity" === n.subtype ? 1 : 0);
                        var h = r(c, t, c.TEXTURE0),
                            u = r(c, e, c.TEXTURE1),
                            d = c.createBuffer();
                        return c.bindBuffer(c.ARRAY_BUFFER, d), c.bufferData(c.ARRAY_BUFFER, new Float32Array([0, 0, i, 0, 0, a, 0, a, i, 0, i, a]), c.STATIC_DRAW), c.enableVertexAttribArray(s.positionLocation), c.vertexAttribPointer(s.positionLocation, 2, c.FLOAT, !1, 0, 0), c.clearColor(0, 0, 0, 0), c.enable(c.BLEND), c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA), c.clear(c.COLOR_BUFFER_BIT), c.drawArrays(c.TRIANGLES, 0, 6), c.flush(), c.deleteTexture(h), c.deleteTexture(u), c.deleteBuffer(d), l
                    },
                    drawFigures: function (t, e, n, i, r) {
                        g || l();
                        var a = g,
                            s = a.canvas,
                            o = a.gl;
                        s.width = t, s.height = e, o.viewport(0, 0, o.drawingBufferWidth, o.drawingBufferHeight), o.uniform2f(a.resolutionLocation, t, e);
                        var c, h, u, d = 0;
                        for (c = 0, h = i.length; c < h; c++) switch (i[c].type) {
                            case "lattice":
                                d += ((u = i[c].coords.length / i[c].verticesPerRow | 0) - 1) * (i[c].verticesPerRow - 1) * 6;
                                break;
                            case "triangles":
                                d += i[c].coords.length
                        }
                        var f = new Float32Array(2 * d),
                            p = new Uint8Array(3 * d),
                            A = r.coords,
                            m = r.colors,
                            v = 0,
                            b = 0;
                        for (c = 0, h = i.length; c < h; c++) {
                            var S = i[c],
                                x = S.coords,
                                y = S.colors;
                            switch (S.type) {
                                case "lattice":
                                    var P = S.verticesPerRow;
                                    u = x.length / P | 0;
                                    for (var k = 1; k < u; k++)
                                        for (var C = k * P + 1, F = 1; F < P; F++, C++) f[v] = A[x[C - P - 1]], f[v + 1] = A[x[C - P - 1] + 1], f[v + 2] = A[x[C - P]], f[v + 3] = A[x[C - P] + 1], f[v + 4] = A[x[C - 1]], f[v + 5] = A[x[C - 1] + 1], p[b] = m[y[C - P - 1]], p[b + 1] = m[y[C - P - 1] + 1], p[b + 2] = m[y[C - P - 1] + 2], p[b + 3] = m[y[C - P]], p[b + 4] = m[y[C - P] + 1], p[b + 5] = m[y[C - P] + 2], p[b + 6] = m[y[C - 1]], p[b + 7] = m[y[C - 1] + 1], p[b + 8] = m[y[C - 1] + 2], f[v + 6] = f[v + 2], f[v + 7] = f[v + 3], f[v + 8] = f[v + 4], f[v + 9] = f[v + 5], f[v + 10] = A[x[C]], f[v + 11] = A[x[C] + 1], p[b + 9] = p[b + 3], p[b + 10] = p[b + 4], p[b + 11] = p[b + 5], p[b + 12] = p[b + 6], p[b + 13] = p[b + 7], p[b + 14] = p[b + 8], p[b + 15] = m[y[C]], p[b + 16] = m[y[C] + 1], p[b + 17] = m[y[C] + 2], v += 12, b += 18;
                                    break;
                                case "triangles":
                                    for (var D = 0, w = x.length; D < w; D++) f[v] = A[x[D]], f[v + 1] = A[x[D] + 1], p[b] = m[y[c]], p[b + 1] = m[y[D] + 1], p[b + 2] = m[y[D] + 2], v += 2, b += 3
                            }
                        }
                        n ? o.clearColor(n[0] / 255, n[1] / 255, n[2] / 255, 1) : o.clearColor(0, 0, 0, 0), o.clear(o.COLOR_BUFFER_BIT);
                        var T = o.createBuffer();
                        o.bindBuffer(o.ARRAY_BUFFER, T), o.bufferData(o.ARRAY_BUFFER, f, o.STATIC_DRAW), o.enableVertexAttribArray(a.positionLocation), o.vertexAttribPointer(a.positionLocation, 2, o.FLOAT, !1, 0, 0);
                        var L = o.createBuffer();
                        return o.bindBuffer(o.ARRAY_BUFFER, L), o.bufferData(o.ARRAY_BUFFER, p, o.STATIC_DRAW), o.enableVertexAttribArray(a.colorLocation), o.vertexAttribPointer(a.colorLocation, 3, o.UNSIGNED_BYTE, !1, 0, 0), o.uniform2f(a.scaleLocation, r.scaleX, r.scaleY), o.uniform2f(a.offsetLocation, r.offsetX, r.offsetY), o.drawArrays(o.TRIANGLES, 0, d), o.flush(), o.deleteBuffer(T), o.deleteBuffer(L), s
                    },
                    clear: function () {
                        f && f.canvas && (f.canvas.width = 0, f.canvas.height = 0), g && g.canvas && (g.canvas.width = 0, g.canvas.height = 0), f = null, g = null
                    }
                }
            }(),
            tt = {};
        tt.RadialAxial = {
            fromIR: function (t) {
                var e = t[1],
                    n = t[2],
                    i = t[3],
                    r = t[4],
                    a = t[5],
                    s = t[6];
                return {
                    type: "Pattern",
                    getPattern: function (t) {
                        var o;
                        "axial" === e ? o = t.createLinearGradient(i[0], i[1], r[0], r[1]) : "radial" === e && (o = t.createRadialGradient(i[0], i[1], a, r[0], r[1], s));
                        for (var l = 0, c = n.length; l < c; ++l) {
                            var h = n[l];
                            o.addColorStop(h[0], h[1])
                        }
                        return o
                    }
                }
            }
        };
        var et = function () {
            function t(t, e, n, i, r, a, s, o) {
                var l, c = e.coords,
                    h = e.colors,
                    u = t.data,
                    d = 4 * t.width;
                c[n + 1] > c[i + 1] && (l = n, n = i, i = l, l = a, a = s, s = l), c[i + 1] > c[r + 1] && (l = i, i = r, r = l, l = s, s = o, o = l), c[n + 1] > c[i + 1] && (l = n, n = i, i = l, l = a, a = s, s = l);
                var f = (c[n] + e.offsetX) * e.scaleX,
                    p = (c[n + 1] + e.offsetY) * e.scaleY,
                    A = (c[i] + e.offsetX) * e.scaleX,
                    g = (c[i + 1] + e.offsetY) * e.scaleY,
                    m = (c[r] + e.offsetX) * e.scaleX,
                    v = (c[r + 1] + e.offsetY) * e.scaleY;
                if (!(p >= v))
                    for (var b, S, x, y, P, k, C, F, D, w = h[a], T = h[a + 1], L = h[a + 2], R = h[s], E = h[s + 1], I = h[s + 2], M = h[o], _ = h[o + 1], O = h[o + 2], N = Math.round(p), j = Math.round(v), J = N; J <= j; J++) {
                        J < g ? (b = f - (f - A) * (D = J < p ? 0 : p === g ? 1 : (p - J) / (p - g)), S = w - (w - R) * D, x = T - (T - E) * D, y = L - (L - I) * D) : (b = A - (A - m) * (D = J > v ? 1 : g === v ? 0 : (g - J) / (g - v)), S = R - (R - M) * D, x = E - (E - _) * D, y = I - (I - O) * D), P = f - (f - m) * (D = J < p ? 0 : J > v ? 1 : (p - J) / (p - v)), k = w - (w - M) * D, C = T - (T - _) * D, F = L - (L - O) * D;
                        for (var B = Math.round(Math.min(b, P)), W = Math.round(Math.max(b, P)), G = d * J + 4 * B, U = B; U <= W; U++) D = (D = (b - U) / (b - P)) < 0 ? 0 : D > 1 ? 1 : D, u[G++] = S - (S - k) * D | 0, u[G++] = x - (x - C) * D | 0, u[G++] = y - (y - F) * D | 0, u[G++] = 255
                    }
            }

            function e(e, i, r) {
                var a, s, o = i.coords,
                    l = i.colors;
                switch (i.type) {
                    case "lattice":
                        var c = i.verticesPerRow,
                            h = Math.floor(o.length / c) - 1,
                            u = c - 1;
                        for (a = 0; a < h; a++)
                            for (var d = a * c, f = 0; f < u; f++, d++) t(e, r, o[d], o[d + 1], o[d + c], l[d], l[d + 1], l[d + c]), t(e, r, o[d + c + 1], o[d + 1], o[d + c], l[d + c + 1], l[d + 1], l[d + c]);
                        break;
                    case "triangles":
                        for (a = 0, s = o.length; a < s; a += 3) t(e, r, o[a], o[a + 1], o[a + 2], l[a], l[a + 1], l[a + 2]);
                        break;
                    default:
                        n("illigal figure")
                }
            }
            return function (t, n, i, r, a, s) {
                var o, l, c, h, u = Math.floor(t[0]),
                    d = Math.floor(t[1]),
                    f = Math.ceil(t[2]) - u,
                    p = Math.ceil(t[3]) - d,
                    A = Math.min(Math.ceil(Math.abs(f * n[0] * 1.1)), 3e3),
                    g = Math.min(Math.ceil(Math.abs(p * n[1] * 1.1)), 3e3),
                    m = f / A,
                    v = p / g,
                    b = {
                        coords: i,
                        colors: r,
                        offsetX: -u,
                        offsetY: -d,
                        scaleX: 1 / m,
                        scaleY: 1 / v
                    };
                if ($.isEnabled) o = $.drawFigures(A, g, s, a, b), (l = q.getCanvas("mesh", A, g, !1)).context.drawImage(o, 0, 0), o = l.canvas;
                else {
                    var S = (l = q.getCanvas("mesh", A, g, !1)).context,
                        x = S.createImageData(A, g);
                    if (s) {
                        var y = x.data;
                        for (c = 0, h = y.length; c < h; c += 4) y[c] = s[0], y[c + 1] = s[1], y[c + 2] = s[2], y[c + 3] = 255
                    }
                    for (c = 0; c < a.length; c++) e(x, a[c], b);
                    S.putImageData(x, 0, 0), o = l.canvas
                }
                return {
                    canvas: o,
                    offsetX: u,
                    offsetY: d,
                    scaleX: m,
                    scaleY: v
                }
            }
        }();
        tt.Mesh = {
            fromIR: function (t) {
                var e = t[2],
                    n = t[3],
                    i = t[4],
                    r = t[5],
                    a = t[6],
                    s = t[8];
                return {
                    type: "Pattern",
                    getPattern: function (t, o, l) {
                        var c;
                        if (l) c = J.singularValueDecompose2dScale(t.mozCurrentTransform);
                        else if (c = J.singularValueDecompose2dScale(o.baseTransform), a) {
                            var h = J.singularValueDecompose2dScale(a);
                            c = [c[0] * h[0], c[1] * h[1]]
                        }
                        var u = et(r, c, e, n, i, l ? null : s);
                        return l || (t.setTransform.apply(t, o.baseTransform), a && t.transform.apply(t, a)), t.translate(u.offsetX, u.offsetY), t.scale(u.scaleX, u.scaleY), t.createPattern(u.canvas, "no-repeat")
                    }
                }
            }
        }, tt.Dummy = {
            fromIR: function () {
                return {
                    type: "Pattern",
                    getPattern: function () {
                        return "hotpink"
                    }
                }
            }
        };
        var nt = function () {
            function e(t, e, n, i, r, a) {
                this.operatorList = t[2], this.matrix = t[3] || [1, 0, 0, 1, 0, 0], this.bbox = t[4], this.xstep = t[5], this.ystep = t[6], this.paintType = t[7], this.tilingType = t[8], this.color = e, this.objs = i, this.commonObjs = r, this.baseTransform = a, this.type = "Pattern", this.ctx = n
            }
            var i = {
                COLORED: 1,
                UNCOLORED: 2
            };
            return e.prototype = {
                createPatternCanvas: function (e) {
                    var n = this.operatorList,
                        i = this.bbox,
                        r = this.xstep,
                        a = this.ystep,
                        s = this.paintType,
                        o = this.tilingType,
                        l = this.color,
                        c = this.objs,
                        h = this.commonObjs;
                    t("TilingType: " + o);
                    var u = i[0],
                        d = i[1],
                        f = i[2],
                        p = i[3],
                        A = [u, d],
                        g = [u + r, d + a],
                        m = g[0] - A[0],
                        v = g[1] - A[1],
                        b = J.singularValueDecompose2dScale(this.matrix),
                        S = J.singularValueDecompose2dScale(this.baseTransform),
                        x = [b[0] * S[0], b[1] * S[1]];
                    m = Math.min(Math.ceil(Math.abs(m * x[0])), 3e3), v = Math.min(Math.ceil(Math.abs(v * x[1])), 3e3);
                    var y = q.getCanvas("pattern", m, v, !0),
                        P = y.context,
                        k = new Z(P, h, c);
                    k.groupLevel = e.groupLevel, this.setFillAndStrokeStyleToContext(P, s, l), this.setScale(m, v, r, a), this.transformToScale(k);
                    var C = [1, 0, 0, 1, -A[0], -A[1]];
                    return k.transform.apply(k, C), this.clipBbox(k, i, u, d, f, p), k.executeOperatorList(n), y.canvas
                },
                setScale: function (t, e, n, i) {
                    this.scale = [t / n, e / i]
                },
                transformToScale: function (t) {
                    var e = this.scale,
                        n = [e[0], 0, 0, e[1], 0, 0];
                    t.transform.apply(t, n)
                },
                scaleToContext: function () {
                    var t = this.scale;
                    this.ctx.scale(1 / t[0], 1 / t[1])
                },
                clipBbox: function (t, e, n, i, r, a) {
                    if (e && f(e) && 4 === e.length) {
                        var s = r - n,
                            o = a - i;
                        t.ctx.rect(n, i, s, o), t.clip(), t.endPath()
                    }
                },
                setFillAndStrokeStyleToContext: function (t, e, r) {
                    switch (e) {
                        case i.COLORED:
                            var a = this.ctx;
                            t.fillStyle = a.fillStyle, t.strokeStyle = a.strokeStyle;
                            break;
                        case i.UNCOLORED:
                            var s = J.makeCssRgb(r[0], r[1], r[2]);
                            t.fillStyle = s, t.strokeStyle = s;
                            break;
                        default:
                            n("Unsupported paint type: " + e)
                    }
                },
                getPattern: function (t, e) {
                    var n = this.createPatternCanvas(e);
                    return (t = this.ctx).setTransform.apply(t, this.baseTransform), t.transform.apply(t, this.matrix), this.scaleToContext(), t.createPattern(n, "repeat")
                }
            }, e
        }();
        PDFJS.disableFontFace = !1;
        var it = {
                insertRule: function (t) {
                    var e = document.getElementById("PDFJS_FONT_STYLE_TAG");
                    e || ((e = document.createElement("style")).id = "PDFJS_FONT_STYLE_TAG", document.documentElement.getElementsByTagName("head")[0].appendChild(e));
                    var n = e.sheet;
                    n.insertRule(t, n.cssRules.length)
                },
                clear: function () {
                    var t = document.getElementById("PDFJS_FONT_STYLE_TAG");
                    t && t.parentNode.removeChild(t), this.nativeFontFaces.forEach(function (t) {
                        document.fonts.delete(t)
                    }), this.nativeFontFaces.length = 0
                },
                get loadTestFont() {
                    return s(this, "loadTestFont", atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA=="))
                },
                loadTestFontId: 0,
                loadingContext: {
                    requests: [],
                    nextRequestId: 0
                },
                isSyncFontLoadingSupported: function () {
                    if (P) return !1;
                    var t = window.navigator.userAgent,
                        e = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(t);
                    return !!(e && e[1] >= 14) || "node" === t
                }(),
                nativeFontFaces: [],
                isFontLoadingAPISupported: !P && "undefined" != typeof document && !!document.fonts,
                addNativeFontFace: function (t) {
                    this.nativeFontFaces.push(t), document.fonts.add(t)
                },
                bind: function (t, e) {
                    r(!P, "bind() shall be called from main thread");
                    for (var n = [], i = [], a = [], s = 0, o = t.length; s < o; s++) {
                        var l = t[s];
                        if (!l.attached && !1 !== l.loading)
                            if (l.attached = !0, this.isFontLoadingAPISupported) {
                                var c = l.createNativeFontFace();
                                c && a.push(c.loaded)
                            } else {
                                var h = l.bindDOM();
                                h && (n.push(h), i.push(l))
                            }
                    }
                    var u = it.queueLoadingCallback(e);
                    this.isFontLoadingAPISupported ? Promise.all(i).then(function () {
                        u.complete()
                    }) : n.length > 0 && !this.isSyncFontLoadingSupported ? it.prepareFontLoadEvent(n, i, u) : u.complete()
                },
                queueLoadingCallback: function (t) {
                    var e = it.loadingContext,
                        n = {
                            id: "pdfjs-font-loading-" + e.nextRequestId++,
                            complete: function () {
                                for (r(!n.end, "completeRequest() cannot be called twice"), n.end = Date.now(); e.requests.length > 0 && e.requests[0].end;) {
                                    var t = e.requests.shift();
                                    setTimeout(t.callback, 0)
                                }
                            },
                            callback: t,
                            started: Date.now()
                        };
                    return e.requests.push(n), n
                },
                prepareFontLoadEvent: function (t, n, i) {
                    function r(t, e) {
                        return t.charCodeAt(e) << 24 | t.charCodeAt(e + 1) << 16 | t.charCodeAt(e + 2) << 8 | 255 & t.charCodeAt(e + 3)
                    }

                    function a(t, e, n, i) {
                        return t.substr(0, e) + i + t.substr(e + n)
                    }

                    function s(t, n) {
                        if (++d > 30) return e("Load test font never loaded."), void n();
                        u.font = "30px " + t, u.fillText(".", 0, 20), u.getImageData(0, 0, 1, 1).data[3] > 0 ? n() : setTimeout(s.bind(null, t, n))
                    }
                    var o, l, h = document.createElement("canvas");
                    h.width = 1, h.height = 1;
                    var u = h.getContext("2d"),
                        d = 0,
                        f = "lt" + Date.now() + this.loadTestFontId++,
                        p = this.loadTestFont,
                        A = r(p = a(p, 976, f.length, f), 16);
                    for (o = 0, l = f.length - 3; o < l; o += 4) A = A - 1482184792 + r(f, o) | 0;
                    o < f.length && (A = A - 1482184792 + r(f + "XXX", o) | 0), p = a(p, 16, 4, c(A));
                    var g = '@font-face { font-family:"' + f + '";src:' + ("url(data:font/opentype;base64," + btoa(p) + ");") + "}";
                    it.insertRule(g);
                    var m = [];
                    for (o = 0, l = n.length; o < l; o++) m.push(n[o].loadedName);
                    m.push(f);
                    var v = document.createElement("div");
                    for (v.setAttribute("style", "visibility: hidden;width: 10px; height: 10px;position: absolute; top: 0px; left: 0px;"), o = 0, l = m.length; o < l; ++o) {
                        var b = document.createElement("span");
                        b.textContent = "Hi", b.style.fontFamily = m[o], v.appendChild(b)
                    }
                    document.body.appendChild(v), s(f, function () {
                        document.body.removeChild(v), i.complete()
                    })
                }
            },
            rt = function () {
                function t(t, e, n) {
                    if (this.compiledGlyphs = {}, 1 !== arguments.length);
                    else {
                        var i = arguments[0];
                        for (var r in i) this[r] = i[r]
                    }
                }
                return t.prototype = {
                    createNativeFontFace: function () {
                        if (!this.data) return null;
                        if (PDFJS.disableFontFace) return this.disableFontFace = !0, null;
                        var t = new FontFace(this.loadedName, this.data, {});
                        return it.addNativeFontFace(t), PDFJS.pdfBug && "FontInspector" in y && y.FontInspector.enabled && y.FontInspector.fontAdded(this), t
                    },
                    bindDOM: function () {
                        if (!this.data) return null;
                        if (PDFJS.disableFontFace) return this.disableFontFace = !0, null;
                        var t = o(new Uint8Array(this.data)),
                            e = this.loadedName,
                            n = "url(data:" + this.mimetype + ";base64," + window.btoa(t) + ");",
                            i = '@font-face { font-family:"' + e + '";src:' + n + "}";
                        return it.insertRule(i), PDFJS.pdfBug && "FontInspector" in y && y.FontInspector.enabled && y.FontInspector.fontAdded(this, n), i
                    },
                    getPathGenerator: function (t, e) {
                        if (!(e in this.compiledGlyphs)) {
                            var n = t.get(this.loadedName + "_path_" + e);
                            this.compiledGlyphs[e] = new Function("c", "size", n)
                        }
                        return this.compiledGlyphs[e]
                    }
                }, t
            }(),
            at = 10,
            st = function () {
                function t(t, e, n) {
                    var i = t.style;
                    if (i.fontSize = e.fontSize + "px", i.direction = e.fontDirection < 0 ? "rtl" : "ltr", n) {
                        i.fontWeight = n.black ? n.bold ? "bolder" : "bold" : n.bold ? "bold" : "normal", i.fontStyle = n.italic ? "italic" : "normal";
                        var r = n.loadedName,
                            a = r ? '"' + r + '", ' : "",
                            s = n.fallbackName || "Helvetica, sans-serif";
                        i.fontFamily = a + s
                    }
                }

                function e(t, e) {
                    var n = document.createElement("section"),
                        i = n.style,
                        r = t.rect[2] - t.rect[0],
                        a = t.rect[3] - t.rect[1],
                        s = t.borderWidth || 0;
                    if (s) {
                        r -= 2 * s, a -= 2 * s, i.borderWidth = s + "px";
                        var o = t.color;
                        e && o && (i.borderStyle = "solid", i.borderColor = J.makeCssRgb(Math.round(255 * o[0]), Math.round(255 * o[1]), Math.round(255 * o[2])))
                    }
                    return i.width = r + "px", i.height = a + "px", n
                }

                function n(e, n) {
                    var i = document.createElement("div"),
                        r = e.rect[2] - e.rect[0],
                        a = e.rect[3] - e.rect[1];
                    i.style.width = r + "px", i.style.height = a + "px", i.style.display = "table";
                    var s = document.createElement("div");
                    s.textContent = e.fieldValue;
                    var o = e.textAlignment;
                    return s.style.textAlign = ["left", "center", "right"][o], s.style.verticalAlign = "middle", s.style.display = "table-cell", t(s, e, e.fontRefName ? n.getData(e.fontRefName) : null), i.appendChild(s), i
                }

                function i(t) {
                    var n = t.rect;
                    n[3] - n[1] < at && (n[3] = n[1] + at), n[2] - n[0] < at && (n[2] = n[0] + (n[3] - n[1]));
                    var i = e(t, !1);
                    i.className = "annotText";
                    var r = document.createElement("img");
                    r.style.height = i.style.height, r.style.width = i.style.width;
                    var a = t.name;
                    r.src = PDFJS.imageResourcesPath + "annotation-" + a.toLowerCase() + ".svg", r.alt = "[{{type}} Annotation]", r.dataset.l10nId = "text_annotation_type", r.dataset.l10nArgs = JSON.stringify({
                        type: a
                    });
                    var s = document.createElement("div");
                    s.className = "annotTextContentWrapper", s.style.left = Math.floor(n[2] - n[0] + 5) + "px", s.style.top = "-10px";
                    var o = document.createElement("div");
                    o.className = "annotTextContent", o.setAttribute("hidden", !0);
                    var l, c;
                    if (t.hasBgColor) {
                        var h = t.color,
                            u = .7 * (1 - h[0]) + h[0],
                            d = .7 * (1 - h[1]) + h[1],
                            f = .7 * (1 - h[2]) + h[2];
                        o.style.backgroundColor = J.makeCssRgb(255 * u | 0, 255 * d | 0, 255 * f | 0)
                    }
                    var p = document.createElement("h1"),
                        A = document.createElement("p");
                    if (p.textContent = t.title, t.content || t.title) {
                        var g = document.createElement("span"),
                            m = t.content.split(/(?:\r\n?|\n)/);
                        for (l = 0, c = m.length; l < c; ++l) {
                            var v = m[l];
                            g.appendChild(document.createTextNode(v)), l < c - 1 && g.appendChild(document.createElement("br"))
                        }
                        A.appendChild(g);
                        var b = !1,
                            S = function (t) {
                                t && (b = !0), o.hasAttribute("hidden") && (i.style.zIndex += 1, o.removeAttribute("hidden"))
                            },
                            x = function (t) {
                                t && (b = !1), o.hasAttribute("hidden") || b || (i.style.zIndex -= 1, o.setAttribute("hidden", !0))
                            },
                            y = function () {
                                b ? x(!0) : S(!0)
                            };
                        r.addEventListener("click", function () {
                            y()
                        }, !1), r.addEventListener("mouseover", function () {
                            S()
                        }, !1), r.addEventListener("mouseout", function () {
                            x()
                        }, !1), o.addEventListener("click", function () {
                            x(!0)
                        }, !1)
                    } else o.setAttribute("hidden", !0);
                    return o.appendChild(p), o.appendChild(A), s.appendChild(o), i.appendChild(r), i.appendChild(s), i
                }

                function r(t) {
                    var n = e(t, !0);
                    n.className = "annotLink";
                    var i = document.createElement("a");
                    return i.href = i.title = t.url || "", t.url && PDFJS.openExternalLinksInNewWindow && (i.target = "_blank"), n.appendChild(i), n
                }
                return {
                    getHtmlElement: function (t, e) {
                        switch (t.annotationType) {
                            case D.WIDGET:
                                return n(t, e);
                            case D.TEXT:
                                return i(t);
                            case D.LINK:
                                return r(t);
                            default:
                                throw new Error("Unsupported annotationType: " + t.annotationType)
                        }
                    }
                }
            }();
        PDFJS.AnnotationUtils = st;
        var ot = {
                fontStyle: "normal",
                fontWeight: "normal",
                fillColor: "#000000"
            },
            lt = function () {
                function t(t, e, n) {
                    for (var i = -1, r = e; r < n; r++) {
                        var a = 255 & (i ^ t[r]);
                        i = i >>> 8 ^ s[a]
                    }
                    return -1 ^ i
                }

                function e(e, n, i, r) {
                    var a = r,
                        s = n.length;
                    i[a] = s >> 24 & 255, i[a + 1] = s >> 16 & 255, i[a + 2] = s >> 8 & 255, i[a + 3] = 255 & s, i[a += 4] = 255 & e.charCodeAt(0), i[a + 1] = 255 & e.charCodeAt(1), i[a + 2] = 255 & e.charCodeAt(2), i[a + 3] = 255 & e.charCodeAt(3), a += 4, i.set(n, a);
                    var o = t(i, r + 4, a += n.length);
                    i[a] = o >> 24 & 255, i[a + 1] = o >> 16 & 255, i[a + 2] = o >> 8 & 255, i[a + 3] = 255 & o
                }

                function n(t, e, n) {
                    for (var i = 1, r = 0, a = e; a < n; ++a) r = (r + (i = (i + (255 & t[a])) % 65521)) % 65521;
                    return r << 16 | i
                }

                function i(t, i) {
                    var s, o, l, c = t.width,
                        h = t.height,
                        u = t.data;
                    switch (i) {
                        case F.GRAYSCALE_1BPP:
                            o = 0, s = 1, l = c + 7 >> 3;
                            break;
                        case F.RGB_24BPP:
                            o = 2, s = 8, l = 3 * c;
                            break;
                        case F.RGBA_32BPP:
                            o = 6, s = 8, l = 4 * c;
                            break;
                        default:
                            throw new Error("invalid format")
                    }
                    var d, f, p = new Uint8Array((1 + l) * h),
                        A = 0,
                        g = 0;
                    for (d = 0; d < h; ++d) p[A++] = 0, p.set(u.subarray(g, g + l), A), g += l, A += l;
                    if (i === F.GRAYSCALE_1BPP)
                        for (A = 0, d = 0; d < h; d++)
                            for (A++, f = 0; f < l; f++) p[A++] ^= 255;
                    var m = new Uint8Array([c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, 255 & c, h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h, s, o, 0, 0, 0]),
                        v = p.length,
                        b = Math.ceil(v / 65535),
                        S = new Uint8Array(2 + v + 5 * b + 4),
                        x = 0;
                    S[x++] = 120, S[x++] = 156;
                    for (var y = 0; v > 65535;) S[x++] = 0, S[x++] = 255, S[x++] = 255, S[x++] = 0, S[x++] = 0, S.set(p.subarray(y, y + 65535), x), x += 65535, y += 65535, v -= 65535;
                    S[x++] = 1, S[x++] = 255 & v, S[x++] = v >> 8 & 255, S[x++] = 255 & ~v, S[x++] = (65535 & ~v) >> 8 & 255, S.set(p.subarray(y), x), x += p.length - y;
                    var P = n(p, 0, p.length);
                    S[x++] = P >> 24 & 255, S[x++] = P >> 16 & 255, S[x++] = P >> 8 & 255, S[x++] = 255 & P;
                    var k = r.length + 3 * a + m.length + S.length,
                        C = new Uint8Array(k),
                        D = 0;
                    return C.set(r, D), D += r.length, e("IHDR", m, C, D), D += a + m.length, e("IDATA", S, C, D), D += a + S.length, e("IEND", new Uint8Array(0), C, D), PDFJS.createObjectURL(C, "image/png")
                }
                for (var r = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), a = 12, s = new Int32Array(256), o = 0; o < 256; o++) {
                    for (var l = o, c = 0; c < 8; c++) l = 1 & l ? 3988292384 ^ l >> 1 & 2147483647 : l >> 1 & 2147483647;
                    s[o] = l
                }
                return function (t) {
                    return i(t, void 0 === t.kind ? F.GRAYSCALE_1BPP : t.kind)
                }
            }(),
            ct = function () {
                function t() {
                    this.fontSizeScale = 1, this.fontWeight = ot.fontWeight, this.fontSize = 0, this.textMatrix = j, this.fontMatrix = k, this.leading = 0, this.x = 0, this.y = 0, this.lineX = 0, this.lineY = 0, this.charSpacing = 0, this.wordSpacing = 0, this.textHScale = 1, this.textRise = 0, this.fillColor = ot.fillColor, this.strokeColor = "#000000", this.fillAlpha = 1, this.strokeAlpha = 1, this.lineWidth = 1, this.lineJoin = "", this.lineCap = "", this.miterLimit = 0, this.dashArray = [], this.dashPhase = 0, this.dependencies = [], this.clipId = "", this.pendingClip = !1, this.maskId = ""
                }
                return t.prototype = {
                    clone: function () {
                        return Object.create(this)
                    },
                    setCurrentPoint: function (t, e) {
                        this.x = t, this.y = e
                    }
                }, t
            }(),
            ht = function () {
                function t(t, e) {
                    var n = document.createElementNS("http://www.w3.org/2000/svg", "svg:svg");
                    return n.setAttributeNS(null, "version", "1.1"), n.setAttributeNS(null, "width", t + "px"), n.setAttributeNS(null, "height", e + "px"), n.setAttributeNS(null, "viewBox", "0 0 " + t + " " + e), n
                }

                function n(t) {
                    for (var e = [], n = [], i = t.length, r = 0; r < i; r++) "save" !== t[r].fn ? "restore" === t[r].fn ? e = n.pop() : e.push(t[r]) : (e.push({
                        fnId: 92,
                        fn: "group",
                        items: []
                    }), n.push(e), e = e[e.length - 1].items);
                    return e
                }

                function i(t) {
                    if (t === (0 | t)) return t.toString();
                    var e = t.toFixed(10),
                        n = e.length - 1;
                    if ("0" !== e[n]) return e;
                    do {
                        n--
                    } while ("0" === e[n]);
                    return e.substr(0, "." === e[n] ? n : n + 1)
                }

                function r(t) {
                    if (0 === t[4] && 0 === t[5]) {
                        if (0 === t[1] && 0 === t[2]) return 1 === t[0] && 1 === t[3] ? "" : "scale(" + i(t[0]) + " " + i(t[3]) + ")";
                        if (t[0] === t[3] && t[1] === -t[2]) return "rotate(" + i(180 * Math.acos(t[0]) / Math.PI) + ")"
                    } else if (1 === t[0] && 0 === t[1] && 0 === t[2] && 1 === t[3]) return "translate(" + i(t[4]) + " " + i(t[5]) + ")";
                    return "matrix(" + i(t[0]) + " " + i(t[1]) + " " + i(t[2]) + " " + i(t[3]) + " " + i(t[4]) + " " + i(t[5]) + ")"
                }

                function a(t, e) {
                    this.current = new ct, this.transformMatrix = j, this.transformStack = [], this.extraStack = [], this.commonObjs = t, this.objs = e, this.pendingEOFill = !1, this.embedFonts = !1, this.embeddedFonts = {}, this.cssStyle = null
                }
                var s = "http://www.w3.org/2000/svg",
                    o = "http://www.w3.org/1999/xlink",
                    l = ["butt", "round", "square"],
                    c = ["miter", "round", "bevel"],
                    h = 0,
                    u = 0;
                return a.prototype = {
                    save: function () {
                        this.transformStack.push(this.transformMatrix);
                        var t = this.current;
                        this.extraStack.push(t), this.current = t.clone()
                    },
                    restore: function () {
                        this.transformMatrix = this.transformStack.pop(), this.current = this.extraStack.pop(), this.tgrp = document.createElementNS(s, "svg:g"), this.tgrp.setAttributeNS(null, "transform", r(this.transformMatrix)), this.pgrp.appendChild(this.tgrp)
                    },
                    group: function (t) {
                        this.save(), this.executeOpTree(t), this.restore()
                    },
                    loadDependencies: function (t) {
                        for (var e = t.fnArray, n = e.length, i = t.argsArray, r = this, a = 0; a < n; a++)
                            if (w.dependency === e[a])
                                for (var s = i[a], o = 0, l = s.length; o < l; o++) {
                                    var c, h = s[o];
                                    c = "g_" === h.substring(0, 2) ? new Promise(function (t) {
                                        r.commonObjs.get(h, t)
                                    }) : new Promise(function (t) {
                                        r.objs.get(h, t)
                                    }), this.current.dependencies.push(c)
                                }
                        return Promise.all(this.current.dependencies)
                    },
                    transform: function (t, e, n, i, a, o) {
                        var l = [t, e, n, i, a, o];
                        this.transformMatrix = PDFJS.Util.transform(this.transformMatrix, l), this.tgrp = document.createElementNS(s, "svg:g"), this.tgrp.setAttributeNS(null, "transform", r(this.transformMatrix))
                    },
                    getSVG: function (e, n) {
                        return this.svg = t(n.width, n.height), this.viewport = n, this.loadDependencies(e).then(function () {
                            this.transformMatrix = j, this.pgrp = document.createElementNS(s, "svg:g"), this.pgrp.setAttributeNS(null, "transform", r(n.transform)), this.tgrp = document.createElementNS(s, "svg:g"), this.tgrp.setAttributeNS(null, "transform", r(this.transformMatrix)), this.defs = document.createElementNS(s, "svg:defs"), this.pgrp.appendChild(this.defs), this.pgrp.appendChild(this.tgrp), this.svg.appendChild(this.pgrp);
                            var t = this.convertOpList(e);
                            return this.executeOpTree(t), this.svg
                        }.bind(this))
                    },
                    convertOpList: function (t) {
                        var e = t.argsArray,
                            i = t.fnArray,
                            r = i.length,
                            a = [],
                            s = [];
                        for (var o in w) a[w[o]] = o;
                        for (var l = 0; l < r; l++) {
                            var c = i[l];
                            s.push({
                                fnId: c,
                                fn: a[c],
                                args: e[l]
                            })
                        }
                        return n(s)
                    },
                    executeOpTree: function (t) {
                        for (var n = t.length, i = 0; i < n; i++) {
                            var r = t[i].fn,
                                a = t[i].fnId,
                                s = t[i].args;
                            switch (0 | a) {
                                case w.beginText:
                                    this.beginText();
                                    break;
                                case w.setLeading:
                                    this.setLeading(s);
                                    break;
                                case w.setLeadingMoveText:
                                    this.setLeadingMoveText(s[0], s[1]);
                                    break;
                                case w.setFont:
                                    this.setFont(s);
                                    break;
                                case w.showText:
                                case w.showSpacedText:
                                    this.showText(s[0]);
                                    break;
                                case w.endText:
                                    this.endText();
                                    break;
                                case w.moveText:
                                    this.moveText(s[0], s[1]);
                                    break;
                                case w.setCharSpacing:
                                    this.setCharSpacing(s[0]);
                                    break;
                                case w.setWordSpacing:
                                    this.setWordSpacing(s[0]);
                                    break;
                                case w.setHScale:
                                    this.setHScale(s[0]);
                                    break;
                                case w.setTextMatrix:
                                    this.setTextMatrix(s[0], s[1], s[2], s[3], s[4], s[5]);
                                    break;
                                case w.setLineWidth:
                                    this.setLineWidth(s[0]);
                                    break;
                                case w.setLineJoin:
                                    this.setLineJoin(s[0]);
                                    break;
                                case w.setLineCap:
                                    this.setLineCap(s[0]);
                                    break;
                                case w.setMiterLimit:
                                    this.setMiterLimit(s[0]);
                                    break;
                                case w.setFillRGBColor:
                                    this.setFillRGBColor(s[0], s[1], s[2]);
                                    break;
                                case w.setStrokeRGBColor:
                                    this.setStrokeRGBColor(s[0], s[1], s[2]);
                                    break;
                                case w.setDash:
                                    this.setDash(s[0], s[1]);
                                    break;
                                case w.setGState:
                                    this.setGState(s[0]);
                                    break;
                                case w.fill:
                                    this.fill();
                                    break;
                                case w.eoFill:
                                    this.eoFill();
                                    break;
                                case w.stroke:
                                    this.stroke();
                                    break;
                                case w.fillStroke:
                                    this.fillStroke();
                                    break;
                                case w.eoFillStroke:
                                    this.eoFillStroke();
                                    break;
                                case w.clip:
                                    this.clip("nonzero");
                                    break;
                                case w.eoClip:
                                    this.clip("evenodd");
                                    break;
                                case w.paintSolidColorImageMask:
                                    this.paintSolidColorImageMask();
                                    break;
                                case w.paintJpegXObject:
                                    this.paintJpegXObject(s[0], s[1], s[2]);
                                    break;
                                case w.paintImageXObject:
                                    this.paintImageXObject(s[0]);
                                    break;
                                case w.paintInlineImageXObject:
                                    this.paintInlineImageXObject(s[0]);
                                    break;
                                case w.paintImageMaskXObject:
                                    this.paintImageMaskXObject(s[0]);
                                    break;
                                case w.paintFormXObjectBegin:
                                    this.paintFormXObjectBegin(s[0], s[1]);
                                    break;
                                case w.paintFormXObjectEnd:
                                    this.paintFormXObjectEnd();
                                    break;
                                case w.closePath:
                                    this.closePath();
                                    break;
                                case w.closeStroke:
                                    this.closeStroke();
                                    break;
                                case w.closeFillStroke:
                                    this.closeFillStroke();
                                    break;
                                case w.nextLine:
                                    this.nextLine();
                                    break;
                                case w.transform:
                                    this.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
                                    break;
                                case w.constructPath:
                                    this.constructPath(s[0], s[1]);
                                    break;
                                case w.endPath:
                                    this.endPath();
                                    break;
                                case 92:
                                    this.group(t[i].items);
                                    break;
                                default:
                                    e("Unimplemented method " + r)
                            }
                        }
                    },
                    setWordSpacing: function (t) {
                        this.current.wordSpacing = t
                    },
                    setCharSpacing: function (t) {
                        this.current.charSpacing = t
                    },
                    nextLine: function () {
                        this.moveText(0, this.current.leading)
                    },
                    setTextMatrix: function (t, e, n, r, a, o) {
                        var l = this.current;
                        this.current.textMatrix = this.current.lineMatrix = [t, e, n, r, a, o], this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0, l.xcoords = [], l.tspan = document.createElementNS(s, "svg:tspan"), l.tspan.setAttributeNS(null, "font-family", l.fontFamily), l.tspan.setAttributeNS(null, "font-size", i(l.fontSize) + "px"), l.tspan.setAttributeNS(null, "y", i(-l.y)), l.txtElement = document.createElementNS(s, "svg:text"), l.txtElement.appendChild(l.tspan)
                    },
                    beginText: function () {
                        this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0, this.current.textMatrix = j, this.current.lineMatrix = j, this.current.tspan = document.createElementNS(s, "svg:tspan"), this.current.txtElement = document.createElementNS(s, "svg:text"), this.current.txtgrp = document.createElementNS(s, "svg:g"), this.current.xcoords = []
                    },
                    moveText: function (t, e) {
                        var n = this.current;
                        this.current.x = this.current.lineX += t, this.current.y = this.current.lineY += e, n.xcoords = [], n.tspan = document.createElementNS(s, "svg:tspan"), n.tspan.setAttributeNS(null, "font-family", n.fontFamily), n.tspan.setAttributeNS(null, "font-size", i(n.fontSize) + "px"), n.tspan.setAttributeNS(null, "y", i(-n.y))
                    },
                    showText: function (t) {
                        var e = this.current,
                            n = e.font,
                            a = e.fontSize;
                        if (0 !== a) {
                            var s, o = e.charSpacing,
                                l = e.wordSpacing,
                                c = e.fontDirection,
                                h = e.textHScale * c,
                                u = t.length,
                                f = n.vertical,
                                p = a * e.fontMatrix[0],
                                A = 0;
                            for (s = 0; s < u; ++s) {
                                var g = t[s];
                                if (null !== g)
                                    if (d(g)) A += -g * a * .001;
                                    else {
                                        e.xcoords.push(e.x + A * h);
                                        var m = g.width,
                                            v = g.fontChar;
                                        A += m * p + o * c, e.tspan.textContent += v
                                    }
                                else A += c * l
                            }
                            f ? e.y -= A * h : e.x += A * h, e.tspan.setAttributeNS(null, "x", e.xcoords.map(i).join(" ")), e.tspan.setAttributeNS(null, "y", i(-e.y)), e.tspan.setAttributeNS(null, "font-family", e.fontFamily), e.tspan.setAttributeNS(null, "font-size", i(e.fontSize) + "px"), e.fontStyle !== ot.fontStyle && e.tspan.setAttributeNS(null, "font-style", e.fontStyle), e.fontWeight !== ot.fontWeight && e.tspan.setAttributeNS(null, "font-weight", e.fontWeight), e.fillColor !== ot.fillColor && e.tspan.setAttributeNS(null, "fill", e.fillColor), e.txtElement.setAttributeNS(null, "transform", r(e.textMatrix) + " scale(1, -1)"), e.txtElement.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), e.txtElement.appendChild(e.tspan), e.txtgrp.appendChild(e.txtElement), this.tgrp.appendChild(e.txtElement)
                        }
                    },
                    setLeadingMoveText: function (t, e) {
                        this.setLeading(-e), this.moveText(t, e)
                    },
                    addFontStyle: function (t) {
                        this.cssStyle || (this.cssStyle = document.createElementNS(s, "svg:style"), this.cssStyle.setAttributeNS(null, "type", "text/css"), this.defs.appendChild(this.cssStyle));
                        var e = PDFJS.createObjectURL(t.data, t.mimetype);
                        this.cssStyle.textContent += '@font-face { font-family: "' + t.loadedName + '"; src: url(' + e + "); }\n"
                    },
                    setFont: function (t) {
                        var e = this.current,
                            n = this.commonObjs.get(t[0]),
                            r = t[1];
                        this.current.font = n, this.embedFonts && n.data && !this.embeddedFonts[n.loadedName] && (this.addFontStyle(n), this.embeddedFonts[n.loadedName] = n), e.fontMatrix = n.fontMatrix ? n.fontMatrix : k;
                        var a = n.black ? n.bold ? "bolder" : "bold" : n.bold ? "bold" : "normal",
                            o = n.italic ? "italic" : "normal";
                        r < 0 ? (r = -r, e.fontDirection = -1) : e.fontDirection = 1, e.fontSize = r, e.fontFamily = n.loadedName, e.fontWeight = a, e.fontStyle = o, e.tspan = document.createElementNS(s, "svg:tspan"), e.tspan.setAttributeNS(null, "y", i(-e.y)), e.xcoords = []
                    },
                    endText: function () {
                        this.current.pendingClip ? (this.cgrp.appendChild(this.tgrp), this.pgrp.appendChild(this.cgrp)) : this.pgrp.appendChild(this.tgrp), this.tgrp = document.createElementNS(s, "svg:g"), this.tgrp.setAttributeNS(null, "transform", r(this.transformMatrix))
                    },
                    setLineWidth: function (t) {
                        this.current.lineWidth = t
                    },
                    setLineCap: function (t) {
                        this.current.lineCap = l[t]
                    },
                    setLineJoin: function (t) {
                        this.current.lineJoin = c[t]
                    },
                    setMiterLimit: function (t) {
                        this.current.miterLimit = t
                    },
                    setStrokeRGBColor: function (t, e, n) {
                        var i = J.makeCssRgb(t, e, n);
                        this.current.strokeColor = i
                    },
                    setFillRGBColor: function (t, e, n) {
                        var i = J.makeCssRgb(t, e, n);
                        this.current.fillColor = i, this.current.tspan = document.createElementNS(s, "svg:tspan"), this.current.xcoords = []
                    },
                    setDash: function (t, e) {
                        this.current.dashArray = t, this.current.dashPhase = e
                    },
                    constructPath: function (t, e) {
                        var n = this.current,
                            r = n.x,
                            a = n.y;
                        n.path = document.createElementNS(s, "svg:path");
                        for (var o = [], l = t.length, c = 0, h = 0; c < l; c++) switch (0 | t[c]) {
                            case w.rectangle:
                                r = e[h++], a = e[h++];
                                var u = r + e[h++],
                                    d = a + e[h++];
                                o.push("M", i(r), i(a), "L", i(u), i(a), "L", i(u), i(d), "L", i(r), i(d), "Z");
                                break;
                            case w.moveTo:
                                r = e[h++], a = e[h++], o.push("M", i(r), i(a));
                                break;
                            case w.lineTo:
                                r = e[h++], a = e[h++], o.push("L", i(r), i(a));
                                break;
                            case w.curveTo:
                                r = e[h + 4], a = e[h + 5], o.push("C", i(e[h]), i(e[h + 1]), i(e[h + 2]), i(e[h + 3]), i(r), i(a)), h += 6;
                                break;
                            case w.curveTo2:
                                r = e[h + 2], a = e[h + 3], o.push("C", i(r), i(a), i(e[h]), i(e[h + 1]), i(e[h + 2]), i(e[h + 3])), h += 4;
                                break;
                            case w.curveTo3:
                                r = e[h + 2], a = e[h + 3], o.push("C", i(e[h]), i(e[h + 1]), i(r), i(a), i(r), i(a)), h += 4;
                                break;
                            case w.closePath:
                                o.push("Z")
                        }
                        n.path.setAttributeNS(null, "d", o.join(" ")), n.path.setAttributeNS(null, "stroke-miterlimit", i(n.miterLimit)), n.path.setAttributeNS(null, "stroke-linecap", n.lineCap), n.path.setAttributeNS(null, "stroke-linejoin", n.lineJoin), n.path.setAttributeNS(null, "stroke-width", i(n.lineWidth) + "px"), n.path.setAttributeNS(null, "stroke-dasharray", n.dashArray.map(i).join(" ")), n.path.setAttributeNS(null, "stroke-dashoffset", i(n.dashPhase) + "px"), n.path.setAttributeNS(null, "fill", "none"), this.tgrp.appendChild(n.path), n.pendingClip ? (this.cgrp.appendChild(this.tgrp), this.pgrp.appendChild(this.cgrp)) : this.pgrp.appendChild(this.tgrp), n.element = n.path, n.setCurrentPoint(r, a)
                    },
                    endPath: function () {
                        this.current.pendingClip ? (this.cgrp.appendChild(this.tgrp), this.pgrp.appendChild(this.cgrp)) : this.pgrp.appendChild(this.tgrp), this.tgrp = document.createElementNS(s, "svg:g"), this.tgrp.setAttributeNS(null, "transform", r(this.transformMatrix))
                    },
                    clip: function (t) {
                        var e = this.current;
                        e.clipId = "clippath" + h, h++, this.clippath = document.createElementNS(s, "svg:clipPath"), this.clippath.setAttributeNS(null, "id", e.clipId);
                        var n = e.element.cloneNode();
                        "evenodd" === t ? n.setAttributeNS(null, "clip-rule", "evenodd") : n.setAttributeNS(null, "clip-rule", "nonzero"), this.clippath.setAttributeNS(null, "transform", r(this.transformMatrix)), this.clippath.appendChild(n), this.defs.appendChild(this.clippath), e.pendingClip = !0, this.cgrp = document.createElementNS(s, "svg:g"), this.cgrp.setAttributeNS(null, "clip-path", "url(#" + e.clipId + ")"), this.pgrp.appendChild(this.cgrp)
                    },
                    closePath: function () {
                        var t = this.current,
                            e = t.path.getAttributeNS(null, "d");
                        e += "Z", t.path.setAttributeNS(null, "d", e)
                    },
                    setLeading: function (t) {
                        this.current.leading = -t
                    },
                    setTextRise: function (t) {
                        this.current.textRise = t
                    },
                    setHScale: function (t) {
                        this.current.textHScale = t / 100
                    },
                    setGState: function (t) {
                        for (var e = 0, n = t.length; e < n; e++) {
                            var i = t[e],
                                r = i[0],
                                a = i[1];
                            switch (r) {
                                case "LW":
                                    this.setLineWidth(a);
                                    break;
                                case "LC":
                                    this.setLineCap(a);
                                    break;
                                case "LJ":
                                    this.setLineJoin(a);
                                    break;
                                case "ML":
                                    this.setMiterLimit(a);
                                    break;
                                case "D":
                                    this.setDash(a[0], a[1]);
                                    break;
                                case "RI":
                                case "FL":
                                    break;
                                case "Font":
                                    this.setFont(a)
                            }
                        }
                    },
                    fill: function () {
                        var t = this.current;
                        t.element.setAttributeNS(null, "fill", t.fillColor)
                    },
                    stroke: function () {
                        var t = this.current;
                        t.element.setAttributeNS(null, "stroke", t.strokeColor), t.element.setAttributeNS(null, "fill", "none")
                    },
                    eoFill: function () {
                        var t = this.current;
                        t.element.setAttributeNS(null, "fill", t.fillColor), t.element.setAttributeNS(null, "fill-rule", "evenodd")
                    },
                    fillStroke: function () {
                        this.stroke(), this.fill()
                    },
                    eoFillStroke: function () {
                        this.current.element.setAttributeNS(null, "fill-rule", "evenodd"), this.fillStroke()
                    },
                    closeStroke: function () {
                        this.closePath(), this.stroke()
                    },
                    closeFillStroke: function () {
                        this.closePath(), this.fillStroke()
                    },
                    paintSolidColorImageMask: function () {
                        var t = this.current,
                            e = document.createElementNS(s, "svg:rect");
                        e.setAttributeNS(null, "x", "0"), e.setAttributeNS(null, "y", "0"), e.setAttributeNS(null, "width", "1px"), e.setAttributeNS(null, "height", "1px"), e.setAttributeNS(null, "fill", t.fillColor), this.tgrp.appendChild(e)
                    },
                    paintJpegXObject: function (t, e, n) {
                        var r = this.current,
                            a = this.objs.get(t),
                            l = document.createElementNS(s, "svg:image");
                        l.setAttributeNS(o, "xlink:href", a.src), l.setAttributeNS(null, "width", a.width + "px"), l.setAttributeNS(null, "height", a.height + "px"), l.setAttributeNS(null, "x", "0"), l.setAttributeNS(null, "y", i(-n)), l.setAttributeNS(null, "transform", "scale(" + i(1 / e) + " " + i(-1 / n) + ")"), this.tgrp.appendChild(l), r.pendingClip ? (this.cgrp.appendChild(this.tgrp), this.pgrp.appendChild(this.cgrp)) : this.pgrp.appendChild(this.tgrp)
                    },
                    paintImageXObject: function (t) {
                        var n = this.objs.get(t);
                        n ? this.paintInlineImageXObject(n) : e("Dependent image isn't ready yet")
                    },
                    paintInlineImageXObject: function (t, e) {
                        var n = this.current,
                            r = t.width,
                            a = t.height,
                            l = lt(t),
                            c = document.createElementNS(s, "svg:rect");
                        c.setAttributeNS(null, "x", "0"), c.setAttributeNS(null, "y", "0"), c.setAttributeNS(null, "width", i(r)), c.setAttributeNS(null, "height", i(a)), n.element = c, this.clip("nonzero");
                        var h = document.createElementNS(s, "svg:image");
                        h.setAttributeNS(o, "xlink:href", l), h.setAttributeNS(null, "x", "0"), h.setAttributeNS(null, "y", i(-a)), h.setAttributeNS(null, "width", i(r) + "px"), h.setAttributeNS(null, "height", i(a) + "px"), h.setAttributeNS(null, "transform", "scale(" + i(1 / r) + " " + i(-1 / a) + ")"), e ? e.appendChild(h) : this.tgrp.appendChild(h), n.pendingClip ? (this.cgrp.appendChild(this.tgrp), this.pgrp.appendChild(this.cgrp)) : this.pgrp.appendChild(this.tgrp)
                    },
                    paintImageMaskXObject: function (t) {
                        var e = this.current,
                            n = t.width,
                            r = t.height,
                            a = e.fillColor;
                        e.maskId = "mask" + u++;
                        var o = document.createElementNS(s, "svg:mask");
                        o.setAttributeNS(null, "id", e.maskId);
                        var l = document.createElementNS(s, "svg:rect");
                        l.setAttributeNS(null, "x", "0"), l.setAttributeNS(null, "y", "0"), l.setAttributeNS(null, "width", i(n)), l.setAttributeNS(null, "height", i(r)), l.setAttributeNS(null, "fill", a), l.setAttributeNS(null, "mask", "url(#" + e.maskId + ")"), this.defs.appendChild(o), this.tgrp.appendChild(l), this.paintInlineImageXObject(t, o)
                    },
                    paintFormXObjectBegin: function (t, e) {
                        if (this.save(), f(t) && 6 === t.length && this.transform(t[0], t[1], t[2], t[3], t[4], t[5]), f(e) && 4 === e.length) {
                            var n = e[2] - e[0],
                                r = e[3] - e[1],
                                a = document.createElementNS(s, "svg:rect");
                            a.setAttributeNS(null, "x", e[0]), a.setAttributeNS(null, "y", e[1]), a.setAttributeNS(null, "width", i(n)), a.setAttributeNS(null, "height", i(r)), this.current.element = a, this.clip("nonzero"), this.endPath()
                        }
                    },
                    paintFormXObjectEnd: function () {
                        this.restore()
                    }
                }, a
            }();
        PDFJS.SVGGraphics = ht
    }.call("undefined" == typeof window ? this : window), PDFJS.workerSrc || "undefined" == typeof document || (PDFJS.workerSrc = function () {
        "use strict";
        var t = (document.body || document.getElementsByTagName("head")[0]).lastChild.src;
        return t && t.replace(/\.js$/i, ".worker.js")
    }());