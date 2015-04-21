//
//	jCached.js 1.0.0
//  For all details and documentation: http://jCached.com
//
//	@author: Adam Colon
//	@copyright: (c) 2014 Adam Colon

//	@license: GNU General Public License v2.0
//	This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License along
//  with this program; if not, write to the Free Software Foundation, Inc.,
//  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

var jCached = new function(){
	if( typeof(window.localStorage) != 'undefined' && window.localStorage != null ){
		this.set = function( key, value, expiration ){
			if( typeof(key) == 'string' && key.length > 0 ){
				return window.localStorage.setItem( key, JSON.stringify( value ) );
			}
		}

		this.get = function( key ){
			if( typeof(key) == 'string' && key.length > 0 ){
				return JSON.parse( window.localStorage.getItem( key ) );
			}
		}

		this.delete = function( key ){
			if( typeof(key) == 'string' && key.length > 0 ){
				return window.localStorage.removeItem( key );
			}
		}

		this.flush = function(){
			return window.localStorage.clear();
		}

		this.count = function(){
			return window.localStorage.length;
		}

		this.iterate = function( callback, limit ){
			if( window.localStorage.length > 0 && typeof( callback ) == 'function' ){
				count = 0;
				for( key in window.localStorage){
					count++;
					if( typeof(limit) != 'number' || limit == 0 || count <= limit ){
						var value = this.get(key);
						if( value ){
	  						callback({key:value});
	  					}
	  				}
				}
			}
		}

		this.getAll = function(){
			var data = [];

			if( window.localStorage.length > 0 ){
				for( key in window.localStorage){
					var value = this.get(key);
					if( value ){
	  					data.push({key:value});
  					}
				}
			}

			return data;
		}

	}else{
		this.set = function(){ return null; }
		this.get = function(){ return null; }
		this.delete = function(){ return null; }
		this.flush = function(){ return null; }
		this.count = function(){ return null; }
		this.iterate = function(){ return null; }
		this.getAll = function(){ return null; }
	}
}
