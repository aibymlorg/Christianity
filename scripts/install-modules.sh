#!/bin/bash

echo "📦 Installing dependencies for all modules..."

# Culture
if [ -d "modules/culture" ]; then
    echo "Installing Culture module..."
    cd modules/culture && npm install && cd ../..
fi

# Christianity
if [ -d "modules/christianity" ]; then
    echo "Installing Christianity module..."
    cd modules/christianity && npm install && cd ../..
fi

# BibleKnow
if [ -d "modules/bible-know" ]; then
    echo "Installing BibleKnow module..."
    cd modules/bible-know && npm install && cd ../..
fi

# ChurchAdmin
if [ -d "modules/church-admin" ]; then
    echo "Installing ChurchAdmin module..."
    cd modules/church-admin && npm install && cd ../..
fi

echo "✓ All modules installed!"
