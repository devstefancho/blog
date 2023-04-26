import fs from 'fs'
import inquirer from 'inquirer'

const questions = [
  {
    type: 'input',
    name: 'slug',
    message: 'Enter the slug:',
  },
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title:',
  },
]

// TODO: formattedDate가 너무 복잡하므로 개선필요
const formattedDate = new Date()
  .toLocaleDateString('ko-KR')
  .replace(/\b\d\b/g, (digit) => digit.padStart(2, '0'))
  .replace(/\.\s/g, '-')
  .replace(/\./g, '')

inquirer.prompt(questions).then((answers) => {
  const slug = answers.slug.trim().replace(/ /g, '-')
  const title = answers.title
  const template = [
    '---',
    `slug: ${slug}`,
    `date: ${formattedDate}`,
    `title: ${title}`,
    '---',
  ].join('\n')
  const fileName = `${slug}.md`

  fs.writeFile(`content/${fileName}`, template, (err) => {
    if (err) {
      console.error('Error:', err)
    } else {
      console.log(`Successfully created ${fileName}`)
    }
  })
})
