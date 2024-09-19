Build instructions:
npx @11ty/eleventy --input=. --output=docs --serve
find . -name "*.md" -type f ! -name "all_content.md" -print0 | xargs -0 cat > dataset/all_content.md
sed -e 's/<[^>]*>//g' dataset/all_content.md > dataset/all_content_no_html.md