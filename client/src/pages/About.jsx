import Layout from '../layout/Layout'

const About = () => {
  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <h2 className='text-center'>About</h2>
            <p>
              Hello! My name is{' '}
              <a
                href='https://www.linkedin.com/in/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Alberto Rivera
              </a>
              . I&apos;m a software engineer based in Madrid. I&apos;ve been
              working in the tech industry for over 10 years. I&apos;m currently
              working as a software engineer at{' '}
              <a
                href='https://www.linkedin.com/company/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Company
              </a>
              .
            </p>

            <p>
              I&apos;m passionate about building software that helps people.
              I&apos;m also passionate about learning new technologies and
              sharing my knowledge with others.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About
