(function (root) {
	"use strict";

	if (!Object.create) {
		Object.create = (function () {
			function F() {
			}

			return function (o) {
				if (arguments.length != 1) {
					throw new Error("Object.create implementation only accepts one parameter.");
				}

				F.prototype = o;
				return new F();
			};
		})();
	}

	var fnTest = /xyz/.test(function () {
		xyz;
	}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	function BaseClass() {
	}

	// Create a new Class that inherits from this class
	BaseClass.extend = function (props, adopt) {
		var _super = this.prototype;
		adopt = adopt || [];

		//adopt from existing classes
		for(var i=0; i<adopt.length; i++) {
			var source = adopt[i];
			if(source.prototype) {
				source = source.prototype;
			}

			for(var k in source) {
				if (source.hasOwnProperty(k) && !props[k]) {
      				props[k] = source[k];
    			}
			}
		}

		// wrap the superclass constructor if the subclass doesn't have one;
		// without the wrap, we would later change the "constructor" property
		// for both the superclass AND the new class and thereby screw up the
		// inheritance chain
		if(_super.init && !props.init) {
			props.init = function() {
				this._super.apply(this, arguments);
			};
		}

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		var proto = Object.create(_super);

		// Copy the properties over onto the new prototype
		for (var name in props) {
			// Check if we're overwriting an existing function
			proto[name] = typeof props[name] === "function" &&
				typeof _super[name] === "function" && fnTest.test(props[name]) ?
				(function (name, fn) {
					return function () {
						var tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, props[name]) :
				props[name];
		}

		// The new constructor
		var newClass = typeof proto.init === "function" ?
			proto.init : // All construction is actually done in the init method
			function () {};

		// Populate our constructed prototype object
		newClass.prototype = proto;

		// Enforce the constructor to be what we expect
		proto.constructor = newClass;

		// And make this class extendable
		newClass.extend = BaseClass.extend;

		return newClass;
	};

	//Exports
	//AMD
	if (typeof define !== 'undefined' && define.amd) {
		define([], function () {
			return BaseClass;
		});
	}

	//CommonJS
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = BaseClass;
	}

	//Script tag
	else {
		root.ClassExtender = BaseClass;
	}
} (this));
