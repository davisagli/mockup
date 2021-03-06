// Author: Nathan Van Gheem
// Contact: nathan@vangheem.us
// Version: 1.0
//
// Description:
//
// License:
//
// Copyright (C) 2010 Plone Foundation
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation; either version 2 of the License.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
// more details.
//
// You should have received a copy of the GNU General Public License along with
// this program; if not, write to the Free Software Foundation, Inc., 51
// Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//


define([
  'backbone',
  'js/patterns/structure/models/result'
], function(Backbone, Result) {
"use strict";

  var SelectedCollection = Backbone.Collection.extend({
    model: Result,
    removeResult: function(model){
      return this.removeByUID(model.uid());
    },
    removeByUID: function(uid){
      var found = this.getByUID(uid);
      if(found){
        this.remove(found);
      }
      return found;
    },
    getByUID: function(uid){
      return this.findWhere({UID: uid});
    }
  });

  return SelectedCollection;
});

