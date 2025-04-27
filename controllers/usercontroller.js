const User = require('../models/user'); // Assuming you have a User model

// Function to increment credits
const incrementCredits = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Increment credits (for copying link, let's add 5 points as an example)
    user.credits += 5;

    // Save updated user
    await user.save();
    return user;
  } catch (err) {
    console.error('Error updating credits:', err);
    throw new Error('Failed to update credits');
  }
};

// Endpoint to increment credits when a post is shared by copying the link
const sharePostLink = async (req, res) => {
  const userId = req.user.id; // Assuming you use JWT to get the user ID

  try {
    const updatedUser = await incrementCredits(userId);
    res.json({
      success: true,
      credits: updatedUser.credits,
    });
  } catch (err) {
    res.status(500).json({ error: 'Could not increment credits' });
  }
};

module.exports = { sharePostLink };
