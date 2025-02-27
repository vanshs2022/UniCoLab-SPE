import { useState } from 'react';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    profilePic: '',
    skills: [{ skill: '', rating: 0 }],
    projects: [{ name: '', url: '' }],
    experience: '',
    selfDescription: '',
    cv: '',
    hackathons: '',
    interestedFields: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile Form</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
      <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
      <input type="url" name="profilePic" placeholder="Profile Pic URL" value={formData.profilePic} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      
      <label>Skills:</label>
      {formData.skills.map((skill, index) => (
        <div key={index} className="flex mb-2">
          <input type="text" placeholder="Skill" value={skill.skill} onChange={(e) => {
            const newSkills = [...formData.skills];
            newSkills[index].skill = e.target.value;
            setFormData({ ...formData, skills: newSkills });
          }} className="w-full p-2 border rounded" />
          <input type="number" placeholder="Stars" value={skill.rating} onChange={(e) => {
            const newSkills = [...formData.skills];
            newSkills[index].rating = e.target.value;
            setFormData({ ...formData, skills: newSkills });
          }} className="ml-2 p-2 border rounded" min="1" max="5" />
        </div>
      ))}
      <button type="button" onClick={() => setFormData({ ...formData, skills: [...formData.skills, { skill: '', rating: 0 }] })} className="mb-2 p-2 border rounded bg-blue-500 text-white">Add Skill</button>
      
      <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="w-full p-2 mb-2 border rounded"></textarea>
      <textarea name="selfDescription" placeholder="Self Description" value={formData.selfDescription} onChange={handleChange} className="w-full p-2 mb-2 border rounded"></textarea>
      <input type="url" name="cv" placeholder="CV URL" value={formData.cv} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="text" name="hackathons" placeholder="Hackathons participated" value={formData.hackathons} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="text" name="interestedFields" placeholder="Interested Fields (Frontend, Backend, etc.)" value={formData.interestedFields} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Submit</button>
    </form>
  );
}
