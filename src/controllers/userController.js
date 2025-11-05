const fs = require('fs');
const path = require('path');

// Load users from local JSON file
const usersFilePath = path.join(__dirname, '../data/users.json');
const getUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};

exports.getUsers = async (req, res, next) => {
    try {
        const { role, name } = req.query;
        const users = getUsersFromFilL();
        
        let filteredUsers = users;
        if (role) {
            filteredUsers = filteredUsers.filter(user => user.role === role);
        }
        if (name) {
            filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        }
        
        res.json(filteredUsers);
    } catch (error) {
        next(error);
    }
};

exports.getUserByID = async (req, res) => {
  const users = getUsersFromFile();
  const user = users.find(u => u.userId === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

exports.createUser = async (req, res) => {
  const users = getUsersFromFile();
  const { name, email } = req.body;
  const newUser = {
    userId: users.length ? users[users.length - 1].userId + 1 : 101,
    name,
    email
  };
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
};

exports.updateUser =  async (req, res) => {
 try {
    const { role, address } = req.body;
    // Step 1: Update user fields
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: {  role } },
      { new: true, runValidators: true, context: 'query' }
    );
 
    //Step 2: if user exists or not
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
 
    // Step 3: Update referenced address document
    let updatedAddress = null;
    if (address && user.addresses) {
      updatedAddress = await Address.findByIdAndUpdate(
        user.addresses,
        { $set: { ...address } },  // => city , country ,
        { new: true, runValidators: true , context: 'query'}
      );
    }
    res.json({
      message: 'User and address updated successfully',
      user,
      address: updatedAddress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};