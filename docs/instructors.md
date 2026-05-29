---
title: Staff
layout: default
nav_order: 4
---

# Course Staff

<style>
  .profile-display {
      display: grid;
  }

  .profile {
      display: flex;
      flex-direction: row;
      margin: 12px;
      min-width: 340px;
      line-height: 20px;
  }

  .profile-prof {
      flex-direction: column;
      align-items: center;
      text-align: center;
  }

  .profile-pic {
      height: 10rem;
      width: 10rem;
      border-radius: 8px;
      object-fit: cover;
      margin-right: 8px;
      overflow: hidden;
      flex-shrink: 0;

      /* glow effects */
      position: relative;

      box-shadow:
          0 0 8px rgba(65, 172, 152, 0.86),
          0 0 18px rgba(65, 172, 152, 0.63);

      transition:
          transform 0.25s ease,
          box-shadow 0.25s ease;

      animation: profile-glow 4s ease-in-out infinite;
  }

  /* hover effect */
  .profile-pic:hover {
      transform: scale(1.04);

      box-shadow:
          0 0 14px rgba(65, 172, 152, 0.77),
          0 0 32px rgb(65, 172, 152),
          0 0 48px rgba(65, 172, 153, 0.25);
  }

  .tutor-pic {
      height: 7.5rem;
      width: 7.5rem;

      /* blue tutor glow */
      box-shadow:
          0 0 10px rgba(100, 180, 255, 0.84),
          0 0 24px rgba(100, 180, 255, 0.6);
  }

  .prof {
      height: 12.5rem;
      width: 12.5rem;
      margin-right: 0px;
      margin-bottom: 10px;

      /* gold professor glow */
      box-shadow:
          0 0 12px rgba(255, 215, 100, 0.75),
          0 0 30px rgba(255, 215, 100, 0.65);
  }

  .profile-info-prof {
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .profile-info {
      margin: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .profile-info p {
      text-wrap: pretty;
      margin: 1px;
  }

  .profile-name {
      font-size: 18px;
      font-weight: 500;
      margin-top: 10px;
      margin-bottom: 7px;
  }

  /* breathing glow animation */
  @keyframes profile-glow {

      0% {
          box-shadow:
              0 0 8px rgba(65, 172, 153, 0.85),
              0 0 18px rgba(65, 172, 153, 0.65);
      }

      50% {
          box-shadow:
              0 0 14px rgba(70, 211, 66, 0.85),
              0 0 30px rgba(16, 137, 26, 0.65);
      }

      100% {
          box-shadow:
              0 0 8px rgba(65, 172, 153, 0.85),
              0 0 18px rgba(65, 172, 153, 0.65);
      }
  }

  @media screen and (min-width: 1000px) {
      .profile-display {
          grid-template-columns: 1fr 1fr;
      }
  }
</style>

## Instructor
<div class="profile-display">
<div class="profile profile-prof">
    <img class="profile-pic prof" src="/assets/people/asoosairaj.png" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Gerald Soosairaj">
    <div class="profile-info profile-info-prof">
        <p class="profile-name"><a href="https://geraldsoosairaj.github.io/" target="_blank">Prof. Gerald Soosairaj</a></p>
        <p>Associate Teaching Professor, Computer Science and Engineering</p>
        <p>Office Hours: Tu 3pm-4pm and Th 2pm-3pm, CSE 2106</p>
        <a href="mailto:asoosairaj@ucsd.edu">asoosairaj@ucsd.edu</a>
    </div>
</div>
<div class="profile profile-prof">
    <img class="profile-pic prof" src="/assets/people/Olivia_Weng.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Olivia Weng">
    <div class="profile-info profile-info-prof">
        <p class="profile-name"><a href="https://www.oliviaweng.com/about/" target="_blank">Prof. Olivia Weng</a></p>
        <p>Associate Instructor, Computer Science and Engineering</p>
        <p>Office Hours: We 9am-10am and Th 4:30pm-5:30pm, CSE 4202</p>
        <a href="mailto:oweng@ucsd.edu">oweng@ucsd.edu</a>
    </div>
</div>
</div>

## Teaching Assistants

<div class="profile-display">
  <div class="profile ta-profile">
    <img class="profile-pic ta-pic" src="/assets/people/SangYoon_Byun.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Sang Yoon Byun">
     <div class="profile-info ta-info">
      <p class="profile-name">Sang Yoon Byun</p>
      <p><em>Logistics</em></p>
        <p>Office Hours: Tu 2pm-3pm, CSE B240A</p>
      <a href="mailto:sabyun@ucsd.edu">sabyun@ucsd.edu</a>
     </div>
  </div>
  <div class="profile ta-profile">
    <img class="profile-pic ta-pic" src="/assets/people/Andrew_Cheung.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Andrew Cheung">
     <div class="profile-info ta-info">
      <p class="profile-name">Andrew Cheung</p>
      <p><em>PAs</em></p>
        <p>Office Hours: Fr 4pm-5pm, CSE B260</p>
      <a href="mailto:a7cheung@ucsd.edu">a7cheung@ucsd.edu</a>
     </div>
  </div>
  <div class="profile ta-profile">
    <img class="profile-pic ta-pic" src="/assets/people/etomson.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Elena Tomson">
     <div class="profile-info ta-info">
      <p class="profile-name">Elena Tomson</p>
      <p><em>Labs</em></p>
        <p>Office Hours: We 11am-12pm, CSE B215</p>
      <a href="mailto:etomson@ucsd.edu">etomson@ucsd.edu</a>
     </div>
  </div>
  <div class="profile ta-profile">
    <img class="profile-pic ta-pic" src="/assets/people/Lydia_Zoghbi.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Lydia Zoghbi">
     <div class="profile-info ta-info">
      <p class="profile-name">Lydia Zoghbi</p>
      <p><em>PSets & Skill Demos</em></p>
        <p>Office Hours: Mo 5pm-6pm, CSE B250A</p>
      <a href="mailto:lzoghbi@ucsd.edu">lzoghbi@ucsd.edu</a>
     </div>
  </div>
</div>

See [CSE Floor Plan][1] for office hours locations. See [Calendar](/calendar#tutor-and-office-hours-calendar)
for tutor and office hours laid out in a weekly calendar.

[1]: https://cse.ucsd.edu/about/floormaps

## Tutors

<div class="profile-display">
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Mia_Chen.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Mia Chen">
      <div class="profile-info tutor-info">
      <p class="profile-name">Mia Chen</p>
		<p><em>PAs</em></p>
      <a href="mailto:mic048@ucsd.edu">mic048@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/achernova.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Anya Chernova">
	  <div class="profile-info tutor-info">
      <p class="profile-name">Anya Chernova</p>
		<p><em>PAs</em></p>
      <a href="mailto:achernova@ucsd.edu">achernova@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Miles_Davis.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Miles Davis">
      <div class="profile-info tutor-info">
      <p class="profile-name">Miles Davis</p>
		<p><em>Logistics</em></p>
      <a href="mailto:midavis@ucsd.edu">midavis@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Samuel_Gonzalez.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Samuel Gonzalez">
      <div class="profile-info tutor-info">
      <p class="profile-name">Samuel Gonzalez</p>
	    <p><em>Labs</em></p>	
      <a href="mailto:sag028@ucsd.edu">sag028@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Travis_Henry.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Travis Henry">
      <div class="profile-info tutor-info">
      <p class="profile-name">Travis Henry</p>
		<p><em>Labs</em></p>
      <a href="mailto:trhenry@ucsd.edu">trhenry@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Kyla_Ma.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Kyla Ma">
      <div class="profile-info tutor-info">
      <p class="profile-name">Kyla Ma</p>
		<p><em>PAs</em></p>
      <a href="mailto:kym003@ucsd.edu">kym003@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Sierra_Myers.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Sierra Myers">
      <div class="profile-info tutor-info">
      <p class="profile-name">Sierra Myers</p>
		<p><em>PSets & Skill Demos</em></p>
      <a href="mailto:ssmyers@ucsd.edu">ssmyers@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Janoj_Rengaraj.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Janoj Rengaraj">
      <div class="profile-info tutor-info">
      <p class="profile-name">Janoj Rengaraj</p>
		<p><em>PSets & Skill Demos</em></p>
      <a href="mailto:jrengaraj@ucsd.edu">jrengaraj@ucsd.edu</a>
      </div>
  </div>
  <div class="profile tutor-profile">
    <img class="profile-pic tutor-pic" src="/assets/people/Yuan_Kai_Yang.jpg" onerror="this.src='/assets/people/Fallback.png'" alt="Profile picture for Yuan-Kai Yang">
      <div class="profile-info tutor-info">
      <p class="profile-name">Yuan-Kai (Kevin) Yang</p>
		<p><em>Logistics</em></p>
      <a href="mailto:yuy080@ucsd.edu">yuy080@ucsd.edu</a>
      </div>
  </div>

</div>
