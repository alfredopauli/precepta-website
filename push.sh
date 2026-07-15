#!/bin/bash
set -xe
read -p "Commit message: " message
git add *
git commit -m "$message"
echo "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\n\n" > git push

