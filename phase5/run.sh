#!/bin/bash
gulp watchScripts &
nodemon --watch bundle.js --watch index.html