find build/module | grep \.js$ | while read -r line; do
  sed -i '' -e 's/import \(.*\) from "\(.*\)";/import \1 from "\2.js";/g' "$line"
done
