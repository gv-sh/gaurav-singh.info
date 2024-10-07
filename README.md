# gaurav-singh.info

## Overview
This project is designed to serve as my personal website, showcasing my biography, research, teaching, and projects. It aims to provide visitors with insights into my professional background and current work.

## Usage
To build and serve the project, use the following command:

```bash
npx @11ty/eleventy --input=. --output=docs --serve
```

## Additional Commands
To concatenate all markdown files into one:
```bash
find . -name "*.md" -type f ! -name "all_content.md" -print0 | xargs -0 cat > dataset/all_content.md
```

To remove HTML tags from the concatenated file:
```bash
sed -e 's/<[^>]*>//g' dataset/all_content.md > dataset/all_content_no_html.md
```

## Website Structure
- **Bio**: A brief introduction about myself.
- **Research**: Information on my research interests and publications.
- **Teaching**: Details about my teaching philosophy and courses.
- **Projects**: A showcase of my projects and contributions.
- **Journal**: Personal reflections and updates.
- **Work**: Overview of my professional experience.

## Contributing
If you would like to contribute to this project, please follow these guidelines:
- Fork the repository
- Create a new branch for your feature or bug fix
- Submit a pull request with a clear description of your changes
