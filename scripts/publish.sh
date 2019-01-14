echo "start publish"

# 获取当前分支
branch=`git symbolic-ref --short -q HEAD`

if [ "$branch" != "master" ] ;then
  echo "当前分支不是 master 分支， 是否继续(y/n)"
  read
else 
  echo "$branch"
fi

function Confirm() {
  echo -n "$1(y/n):"
  read response
  if [ $response == 'y' ]; then
    return
  elif [ $response == "n" ]
  then
    return 1 
  else
    echo "输入参数错误，请重新输入"
    Confirm $1
  fi
}

function Eslint() {
  echo "step-1: eslint..."
  git fetch
  git pull origin $branch --rebase
  npm run lint
}

Confirm "当前分支不是master分支，是否继续?"
ret=$?

if [ $ret -eq 0 ]; then
  Eslint
fi
