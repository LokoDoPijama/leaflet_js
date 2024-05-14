<?php

$dom = new DOMDocument;
$dom->loadHTMLFile('index.html');
echo $dom->saveHTML();

